"use client";

import { InterviewDataContext } from "@/context/InterviewDataContext";
import { supabase } from "@/services/supabaseClient";
import Vapi from "@vapi-ai/web";
import axios from "axios";
import { Loader2, PhoneCall, Timer } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const AudioWaveAnimated = ({ color = "bg-blue-500" }) => {
  return (
    <div className="absolute -bottom-1 -right-2 flex gap-[3px] h-8">
      <span className={`w-1 rounded-full ${color} animate-wave1`} />
      <span className={`w-1 rounded-full ${color} animate-wave2`} />
      <span className={`w-1 rounded-full ${color} animate-wave3`} />
      <span className={`w-1 rounded-full ${color} animate-wave2`} />
      <span className={`w-1 rounded-full ${color} animate-wave1`} />
    </div>
  );
};

function StartInterview() {
  const { interviewInfo, setInterviewInfo } = useContext(InterviewDataContext);
  const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
  const [activeUser, setActiveUser] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [interviewEnded, setInterviewEnded] = useState(false);
  const [conversation, setConversation] = useState();
  const {interview_id} = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  
  useEffect(() => {
    if (interviewInfo?.interviewData?.InterviewDuration) {
      const durationStr = interviewInfo.interviewData.InterviewDuration;
      const [minutesStr, secondsStr] = durationStr.split(":");
      const totalSeconds =
        parseInt(minutesStr) * 60 + parseInt(secondsStr || "0");
      setSecondsLeft(totalSeconds);
    }
  }, [interviewInfo]);

  // Start countdown
  useEffect(() => {
    if (secondsLeft <= 0) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft]);

  // Format seconds into MM:SS
  const formatTime = (s) => {
    const mins = Math.floor(s / 60)
      .toString()
      .padStart(2, "0");
    const secs = (s % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  useEffect(() => {
    interviewInfo && startCall();
  }, [interviewInfo]);

  const startCall = () => {
    let questionList;
    interviewInfo?.interviewData?.questionList.forEach((item, index) => {
      questionList = item?.question + "," + questionList;
    });

    const assistantOptions = {
      name: "AI Questify",
      firstMessage:
        "Hi " +
        interviewInfo?.userName +
        ", how are you? Ready for your interview on " +
        interviewInfo?.interviewData?.JobPosition,
      transcriber: {
        provider: "deepgram",
        model: "nova-2",
        language: "en-US",
      },
      voice: {
        provider: "playht",
        voiceId: "jennifer",
      },
      model: {
        provider: "openai",
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content:
              `
                  You are an AI voice assistant conducting interviews.
                  Your job is to ask candidates provided interview questions, assess their responses.
                  Begin the conversation with a friendly introduction, setting a relaxed yet professional tone. Example:
                  "Hey there! Welcome to your ` +
              interviewInfo?.interviewData?.JobPosition +
              ` interview. Let's get started with a few questions!"
                  Ask one question at a time and wait for the candidate's response before proceeding. Keep the questions clear and concise. Below are
                  the questions — ask one by one:
                  Questions: ` +
              questionList +
              `
                  If the candidate struggles, offer hints or rephrase the question without giving away the answer. Example:
                  "Need a hint? Think about how React tracks component updates!"
                  Provide brief, encouraging feedback after each answer. Example:
                  "Well done! You nailed that one."
                  "Hmm, Not exactly—how about one more try?"
                  Keep the conversation natural and engaging — use casual phrases like "Alright, let’s move on to the next one!..." or "Let’s level up with a tougher one!"
                  After 5-8 questions, wrap up the interview smoothly by summarizing their performance. Example:
                  "Impressive performance! You handled the challenge well. Just keep refining your craft!"
                  End on a positive note:
                  "Thanks for chatting! Wishing you success on your next big project!"
                  Key Guidelines:
                  - Be friendly, engaging, and witty
                  - Keep responses short and natural, like a real conversation
                  - Adapt based on the candidate's confidence level
                  - Ensure the interview remains focused on React
                `.trim(),
          },
        ],
      },
    };

    vapi.start(assistantOptions);
  };

  const stopInterview = async () => {
    try {
      setLoading(true);
      vapi.stop(); 
    } catch (err) {
      console.error("Failed to stop interview:", err);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
     const handleMessage = (message) => {
      console.log('Message:', message);
      if (message?.conversation) {
        const convoString = JSON.stringify(message.conversation);
        console.log('Conversation string:', convoString);
        setConversation(convoString);
      }
     };

     vapi.on("message", handleMessage);

     vapi.on("call-start", () => {
      console.log("Call has started.");
      toast("Call Connected...");
    });
  
    vapi.on("speech-start", () => {
      console.log("Assistant speech has started.");
      setActiveUser(false);
    });
  
    vapi.on("speech-end", () => {
      console.log("Assistant speech has ended.");
      setActiveUser(true);
    });
  
    vapi.on("call-end", () => {
      console.log("Call has ended.");
      toast("Interview Ended.");
      setInterviewEnded(true);
      GenerateFeedback();
    });
  

     return () => {
      vapi.off("message", handleMessage);
      vapi.off('call-start', () => console.log("END"));
      vapi.off('speech-start', () => console.log("END"));
      vapi.off('speech-end', () => console.log("END"));
     };
  }, []);

  const GenerateFeedback = async() => {
    const result = await axios.post('/api/feedback', {
      conversation:conversation
    });
    console.log(result?.data);
    const Content = result.data.content;
    const FINAL_CONTENT = Content.replace('```json', '').replace('```', '');
    console.log(FINAL_CONTENT);

    const { data, error } = await supabase
    .from('interview-feedback')
    .insert([
      { userName: interviewInfo?.userName,
        userEmail: interviewInfo?.userEmail,
        interview_id:interview_id,
        feedback: JSON.parse(FINAL_CONTENT),
        recommended: false
      },
    ])
    .select();
    console.log(data);
    router.replace('/interview/'+interview_id+'/complete', {
      userName: interviewInfo?.userName,
      userEmail: interviewInfo?.userEmail,
    });
  }

  return (
    <div className="p-6 sm:p-10 lg:px-48 xl:px-56 min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 animate-fade-in transition-all duration-300 ease-in-out animate-fadeIn">
      {/* Header */}
      <div className="flex justify-between items-center mb-10 animate-slideInRight">
        <h2 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text tracking-tight drop-shadow-sm">
          🎙️ AI Interview Session
        </h2>
        <div className="flex items-center gap-2 bg-yellow-200/80 text-yellow-800 px-4 py-2 rounded-full shadow-lg animate-pulse border border-yellow-300">
          <Timer className="w-5 h-5" />
          <span className="font-mono text-sm font-semibold">
            {formatTime(secondsLeft)}
          </span>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-slideInRight1">
        {/* AI Avatar Card */}
        <div
          className={`relative flex flex-col items-center justify-center h-[450px] bg-white/60 backdrop-blur-md rounded-3xl border transition-all duration-300 
    ${
      !activeUser
        ? "border-blue-500 shadow-[0_0_20px_4px_rgba(59,130,246,0.5)] ring-2 ring-blue-400/50"
        : "border-gray-200 shadow-xl"
    }
    p-8`}
        >
          {/* Top-right AudioWave */}
          {!activeUser && (
            <div className="absolute top-7 right-5 z-10">
              <AudioWaveAnimated color="bg-blue-500" />
            </div>
          )}

          <div className="relative mb-2">
            <Image
              src="/avatarAi2.jpg"
              alt="AI Avatar"
              width={120}
              height={120}
              className={`w-24 h-24 object-cover rounded-full border-4 ${
                !activeUser ? "border-blue-500" : "border-white"
              } shadow-xl`}
            />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">AI Questify</h2>
          <p className="text-sm text-gray-500">🎧 Virtual Interviewer</p>
        </div>

        {/* User Avatar Card */}
        <div
          className={`relative flex flex-col items-center justify-center h-[450px] bg-white/60 backdrop-blur-md rounded-3xl border transition-all duration-300 
    ${
      activeUser
        ? "border-purple-500 shadow-[0_0_20px_4px_rgba(168,85,247,0.4)] ring-2 ring-purple-400/50"
        : "border-gray-200 shadow-xl"
    }
    p-8`}
        >
          {/* Top-right AudioWave */}
          {activeUser && (
            <div className="absolute top-7 right-5 z-10">
              <AudioWaveAnimated color="bg-purple-500" />
            </div>
          )}

          <div className="relative w-20 h-20 mb-2">
            <div
              className={`w-20 h-20 flex items-center justify-center rounded-full text-3xl font-bold text-white 
        ${
          activeUser
            ? "bg-gradient-to-r from-purple-600 to-pink-600"
            : "bg-gradient-to-r from-blue-600 to-purple-600"
        } shadow-2xl`}
            >
              {interviewInfo?.userName?.[0] || "U"}
            </div>
          </div>
          <h2 className="text-xl font-semibold text-gray-800">
            {interviewInfo?.userName || "You"}
          </h2>
          <p className="text-sm text-gray-500">🧑 Candidate</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-center gap-10 mt-12 animate-slideInRight3">
  
    <div className="relative">
      {loading ? (
        <div className="h-16 w-16 flex items-center justify-center rounded-full bg-rose-600">
          <Loader2 className="h-8 w-8 text-white animate-spin" />
        </div>
      ) : (
        <PhoneCall className="h-16 w-16 p-4 text-white bg-rose-600 hover:bg-rose-700 rounded-full cursor-pointer shadow-lg transition-all hover:scale-105"
          onClick={() => setShowConfirmModal(true)}
         />
      )}
    </div>
</div>

 {/* Confirm Modal */}
 {showConfirmModal && (
        <div className="fixed inset-0 glassmorphism bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full space-y-4 text-center">
            <h3 className="text-lg font-semibold text-gray-800">End Interview?</h3>
            <p className="text-sm text-gray-600">
              Are you sure you want to stop the interview? This action cannot be undone.
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm font-medium cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowConfirmModal(false);
                  stopInterview();
                }}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm font-medium cursor-pointer"
              >
                End Interview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <p className="text-center text-gray-500 text-sm mt-10 animate-fade-in tracking-wide">
        {interviewEnded
          ? "🎉 Interview Ended! Thank you for your time!"
          : "⏳ Interview in progress — Stay sharp!"}
      </p>
    </div>
  );
}

export default StartInterview;
