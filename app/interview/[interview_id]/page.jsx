"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InterviewDataContext } from "@/context/InterviewDataContext";
import { supabase } from "@/services/supabaseClient.js";
import {
  ArrowLeft,
  BoomBox,
  Clock2,
  Command,
  IdCard,
  Info,
  ListCollapseIcon,
  Loader2,
  Video,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

function Interview() {
  const [interviewData, setInterviewData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [questionList, setQuestionList] = useState([]);
  const { interview_id } = useParams();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [showJobDescModal, setShowJobDescModal] = useState(false);
  const { interviewInfo, setInterviewInfo } = useContext(InterviewDataContext);
  const router = useRouter();
  const [emailError, setEmailError] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const validateEmail = (email) => {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return gmailRegex.test(email);
  };
  
  // Update button disable logic based on input validity
  useEffect(() => {
    if (userName && validateEmail(userEmail) && !emailError) {
      setIsButtonDisabled(false); // Enable button when both inputs are valid
    } else {
      setIsButtonDisabled(true); // Keep button disabled otherwise
    }
  }, [userName, userEmail, emailError]);

  useEffect(() => {
    if (!interview_id) return;

    const fetchInterviewData = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("interviews")
        .select(
          "interview_id, InterviewDuration, JobPosition, questionList, type, JobDescription"
        )
        .eq("interview_id", interview_id)
        .single();

      if (error) {
        console.error("Error fetching interview data:", error);
        setError(error.message);
      } else {
        setInterviewData(data);
        setQuestionList(data.questionList || []);
      }
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    };

    fetchInterviewData();
  }, [interview_id]);

  // Separate function for joining interview
  const onJoinInterview = async () => {
    if (!interview_id) return;
    setLoading(true);

    let { data: Interviews, error } = await supabase
      .from("interviews")
      .select("*")
      .eq("interview_id", interview_id);

    if (error) {
      console.error("Error fetching interview:", error);
    } else {
      console.log(Interviews[0]);
      setInterviewInfo({
        userName: userName,
        userEmail: userEmail,
        interviewData: Interviews[0],
      });
      router.push("/interview/" + interview_id + "/start");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center glassmorphism-1  bg-opacity-40 z-50">
        <svg className="sun" width="200" height="200" viewBox="0 0 200 200">
          <defs>
            <linearGradient id="linerGradient">
              <stop className="stop1" offset="0" />
              <stop className="stop2" offset="1" />
            </linearGradient>
            <linearGradient
              id="gradient"
              x1="40"
              y1="40"
              x2="160"
              y2="160"
              gradientUnits="userSpaceOnUse"
              href="#linerGradient"
            />
          </defs>
          <path
            className="halvan"
            d="m 164,100 c 0,-35.346224 -28.65378,-64 -64,-64 -35.346224,0 -64,28.653776 -64,64 
               0,35.34622 28.653776,64 64,64 35.34622,0 64,-26.21502 64,-64 
               0,-37.784981 -26.92058,-64 -64,-64 -37.079421,0 -65.267479,26.922736 
               -64,64 1.267479,37.07726 26.703171,65.05317 64,64 37.29683,-1.05317 
               64,-64 64,-64"
          />
          <circle className="strecken" cx="100" cy="100" r="64" />
        </svg>
  
        <svg className="skugga" width="200" height="200" viewBox="0 0 200 200">
          <path
            className="halvan"
            d="m 164,100 c 0,-35.346224 -28.65378,-64 -64,-64 -35.346224,0 -64,28.653776 -64,64 
               0,35.34622 28.653776,64 64,64 35.34622,0 64,-26.21502 64,-64 
               0,-37.784981 -26.92058,-64 -64,-64 -37.079421,0 -65.267479,26.922736 
               -64,64 1.267479,37.07726 26.703171,65.05317 64,64 37.29683,-1.05317 
               64,-64 64,-64"
          />
          <circle className="strecken" cx="100" cy="100" r="64" />
        </svg>
  
        <div className="text-gray-900 text-lg font-medium">
           <span>Loading <span className="arrow animate-bounce">...</span></span>
        </div>
      </div>
    );
  }
  

  if (error)
    return <p className="text-red-600 text-center mt-5">Error: {error}</p>;

  return (
    <div className="px-6 sm:px-12 md:px-20 lg:px-32 xl:px-48 mt-5">
      <div className="flex flex-col bg-white items-center justify-center p-8 sm:p-10 md:p-12 border rounded-2xl shadow-xl animate-slideInRight">
        {/* Larger Logo */}
        <Image
          src="/Logo1.png"
          alt="LogoInterview"
          width={120}
          height={120}
          className="w-24 sm:w-28 md:w-32 absolute top-0 left-1/2 transform -translate-x-1/2 animate-slideInRight1"
        />
        <h2 className="mt-20 text-lg sm:text-xl md:text-2xl font-semibold text-center text-gray-800 animate-slideInRight2">
          Smart Interviews Powered by AI
        </h2>

        {/* Slightly Smaller Interviews Illustration */}
        <Image
          src="/interviews.svg"
          alt="interviews"
          width={500}
          height={500}
          className="w-[70%] sm:w-[60%] md:w-[55%] lg:w-[40%] my-1 mt-2 animate-slideInRight3"
          priority
        />

        {interviewData && (
          <div className="mt-4 text-center space-y-3 animate-slideInRight4">
            <h2 className="font-semibold text-base sm:text-lg md:text-xl lg:text-xl text-gray-900">
              {interviewData.JobPosition}
            </h2>

            <h3 className="flex items-center justify-center gap-2 text-sm sm:text-base md:text-lg lg:text-sm text-gray-500">
              <IdCard className="h-4 w-4" /> {interviewData.interview_id}
            </h3>

            <h3 className="flex items-center justify-center gap-2 text-sm sm:text-base md:text-lg lg:text-sm text-gray-500 mt-2">
              <Clock2 className="h-4 w-4 text-yellow-400" />{" "}
              {interviewData.InterviewDuration}
            </h3>

            <h2 className="flex items-center justify-center gap-2 text-sm sm:text-base md:text-lg lg:text-sm text-gray-500 mt-2">
              <ListCollapseIcon className="h-4 w-4 text-purple-500" />{" "}
              {questionList.length} Questions
            </h2>

            <h2 className="flex items-center justify-center gap-2 text-sm sm:text-base md:text-lg lg:text-sm text-gray-500 mt-2">
              <Command className="h-4 w-4 text-emerald-500" />
              {Array.isArray(interviewData.type)
                ? interviewData.type.join(", ")
                : JSON.parse(interviewData.type || "[]").join(", ")}
            </h2>

            <div
              onClick={() => setShowJobDescModal(true)}
              className="flex items-center justify-center gap-2 text-sm sm:text-base md:text-lg lg:text-sm text-gray-500 mt-2 cursor-pointer hover:text-blue-600 transition-all duration-300"
            >
              <BoomBox className="h-4 w-4 text-blue-500" />
              <span className="font-medium">Job Description</span>
              <ArrowLeft className="w-4 h-4 text-black arrow" />
              <span className="text-sm pr-5 text-gray-500 cursor-default select-none">
                Click to see
              </span>
            </div>

            <div className="w-full mt-6">
              <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-700 mb-2">
                Enter your Full Name
              </h3>
              <Input
                placeholder="e.g. Joe Anderson"
                className="w-full p-3 border rounded-lg text-gray-800"
                onChange={(event) => setUserName(event.target.value)}
              />
            </div>
            <div className="w-full mt-1">
      <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-700 mb-2">
        Enter your Email Address
      </h3>
      <Input
        placeholder="e.g. Joe@gmail.com"
        className={`w-full p-3 border rounded-lg text-gray-800 ${emailError ? 'border-rose-500' : ''}`}
        onChange={(event) => {
          const email = event.target.value;
          setUserEmail(email);
        
          if (email && !validateEmail(email)) {
            setEmailError("Please enter a valid Gmail address (e.g. name@gmail.com)");
          } else {
            setEmailError("");
          }
        }}
        value={userEmail}
      />
      {emailError && (
        <p className="text-rose-500 text-sm mt-1">{emailError}</p>
      )}
    </div>

            <div className="flex flex-col bg-blue-50 gap-4 p-4 rounded-lg mt-6 shadow-md">
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-blue-700 flex items-center justify-center gap-2">
                  <Info className="w-4 h-4 text-blue-600" />
                  Things to Know Before You Begin
                </h3>
                <ul className="list-inside text-sm text-blue-600">
                  <li>
                    - Ensure your camera and microphone are working properly
                  </li>
                  <li>
                    - Use a reliable internet connection for the best experience
                  </li>
                  <li>
                    - A calm setting will create a professional atmosphere
                  </li>
                </ul>
              </div>
            </div>
            <p className="text-sm sm:text-base text-gray-600 font-medium text-center mt-6 italic">
              A great interview starts with confidence, preparation, and a calm
              mind.
            </p>
            <Button
              className="w-full flex items-center justify-center gap-2 py-3 text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-lg shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer animate-buttonEntrance animate-pulseGlow mt-6"
              disabled={isButtonDisabled}
              onClick={() => onJoinInterview()}
            >
              <Video /> {loading && <Loader2 />} Join Interview
            </Button>
          </div>
        )}
      </div>

      <div className="w-full text-center text-sm text-gray-500 mt-20 pb-8">
        © 2025{" "}
        <Link
          href="https://www.linkedin.com/in/javad-sheikhalishahi-60094629b/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 font-semibold hover:text-indigo-600 transition-all duration-200 underline underline-offset-4 decoration-blue-300 hover:decoration-indigo-400"
        >
          Javad.Inc
        </Link>{" "}
        · All rights reserved.
      </div>
      {showJobDescModal && (
        <div className="fixed inset-0 z-50 backdrop-blur-xs bg-opacity-50 flex items-center justify-center px-4 shadow-xl border border-gray-400">
          <div className="bg-white w-full max-w-2xl max-h-[90vh] rounded-2xl shadow-xl animate-fadeIn overflow-hidden flex flex-col border border-gray-300">
            {/* Header with Close Button */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-bold text-gray-800">
                Job Description
              </h2>
              <button
                onClick={() => setShowJobDescModal(false)}
                className="text-gray-500 hover:text-gray-700 transition cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-4 overflow-y-auto text-gray-600 text-sm whitespace-pre-line">
              {interviewData.JobDescription}
            </div>

            {/* Footer (optional) */}
            <div className="p-4 border-t flex justify-end cursor-pointer">
              <Button onClick={() => setShowJobDescModal(false)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Interview;
