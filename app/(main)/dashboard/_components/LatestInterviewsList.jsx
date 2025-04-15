"use client";

import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

function LatestInterviewsList() {
  const [InterviewList, setInterviewList] = useState([]);
  return (
    <div className="my-5 p-1 animate-fadeIn">
      <h2 className="text-2xl font-bold slide-in-top ml-2">
        Interview History
      </h2>
      {InterviewList?.length == 0 && (
        <div className="flex flex-col items-center mt-5 gap-3 p-5 animate-fadeUp">
          <Video className="h-10 w-10 text-blue-600 bounce-in duration-300" />
          <h2 className="text-center font-bold text-gray-500 animate-bounce">
            You haven’t created any interviews yet! 🤔
          </h2>
          <Link href="/dashboard/create-interview" passHref>
            <Button className="flex items-center justify-center gap-2 py-3 text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-lg shadow-xl transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer animate-buttonEntrance animate-pulseGlow">
              + Create New Interview
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default LatestInterviewsList;
