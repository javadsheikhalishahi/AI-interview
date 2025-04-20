'use client';

import { InterviewDataContext } from "@/context/InterviewDataContext";
import Vapi from "@vapi-ai/web";
import { Mic, PhoneCall, Timer } from "lucide-react";
import Image from "next/image";
import { useContext, useEffect } from "react";
import AlertConfirm from "./_components/AlertConfirm";

  
function StartInterview() {
    const {interviewInfo, setInterviewInfo} = useContext(InterviewDataContext);
    const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);

    useEffect(() => {
        interviewInfo && startCall();
       
      }, [interviewInfo]);

    
      const startCall = () => {
        let questionList;
        interviewInfo?.interviewData?.questionList.forEach((item, index) => {
          questionList = item?.question + "," + questionList
        });
    
        const assistantOptions = {
          name: "AI Questify",
          firstMessage: "Hi "+interviewInfo?.userName+", how are you? Ready for your interview on "+interviewInfo?.interviewData?.JobPosition,
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
                content: `
                  You are an AI voice assistant conducting interviews.
                  Your job is to ask candidates provided interview questions, assess their responses.
                  Begin the conversation with a friendly introduction, setting a relaxed yet professional tone. Example:
                  "Hey there! Welcome to your `+interviewInfo?.interviewData?.JobPosition+` interview. Let's get started with a few questions!"
                  Ask one question at a time and wait for the candidate's response before proceeding. Keep the questions clear and concise. Below are
                  the questions — ask one by one:
                  Questions: `+questionList+`
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
    

    const stopInterview = () => {
        vapi.stop()
    }
  return (
    <div className="p-20 lg:px-48 xl:px-56">
      <h2 className="flex justify-between text-xl font-bold"> AI Interview Session
        <span className="flex items-center gap-2 ">
            <Timer />
            00:00:00
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 mt-7 gap-7">
        <div className="flex flex-col items-center justify-center bg-white h-[450px] rounded-2xl border gap-3">
           <Image src={'/avatarAi2.jpg'} alt="Ai" width={100} height={100} className="w-[60px] h-[60px] object-fill rounded-full"/>
           <h2>AI Questify</h2>
        </div>
        <div className="flex flex-col items-center justify-center bg-white h-[450px] rounded-2xl border gap-3">
            <h2 className="bg-blue-600 text-white text-2xl p-3 rounded-full px-6">{interviewInfo?.userName[0]}</h2>
            <h2>{interviewInfo?.userName}</h2>
        </div>
      </div>
      <div className="flex items-center justify-center gap-5 mt-7">
        <Mic className="h-14 w-14 p-3 text-white bg-gray-400 rounded-full cursor-pointer" />
        <AlertConfirm stopInterview={() => stopInterview()}>
            <PhoneCall className="h-14 w-14 p-3 text-white bg-rose-600 rounded-full cursor-pointer" />
        </AlertConfirm>
        
      </div>
      <h2 className="text-sm text-center text-gray-500 mt-5">Interview in Progress...</h2>
    </div>
  )
}

export default StartInterview;
