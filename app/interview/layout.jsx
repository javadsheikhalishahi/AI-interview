'use client'

import { InterviewDataContext } from "@/context/InterviewDataContext";
import { useState } from "react";
import Header from "./_components/Header";

function InterviewLayout({ children }) {
  const [interviewInfo, setInterviewInfo] = useState();

  return (
    <InterviewDataContext.Provider value={{interviewInfo, setInterviewInfo}}>
    <div className="bg-gradient-to-r from-blue-50 via-purple-100 to-pink-100">
         <Header />
      { children }
    </div>
    </InterviewDataContext.Provider>
  )
}

export default InterviewLayout;
