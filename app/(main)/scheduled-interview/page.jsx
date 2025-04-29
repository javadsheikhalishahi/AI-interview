"use client";

import { useUser } from "@/app/provider";
import { Button } from "@/components/ui/button";
import { supabase } from "@/services/supabaseClient";
import { ArrowDownFromLine, Redo } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import InterviewCards from "../dashboard/_components/InterviewCards";

function ScheduledInterview() {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState();
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    if (user) fetchInterviewList();
  }, [user]);

  const fetchInterviewList = async () => {
    const { data } = await supabase
      .from('interviews')
      .select('JobPosition, InterviewDuration, questionList, interview_id, interview-feedback(userEmail)')
      .eq('userEmail', user?.email)
      .order('id', { ascending: false });

    setInterviewList(data || []);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  return (
    <div className="mt-2">
      {/* Header */}
      <div className="text-center mb-10 animate-fadeUp">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 animate-fadeIn">
          Your Scheduled Interviews
        </h2>
        <p className="mt-3 text-sm text-gray-400 flex items-center justify-center gap-2">Manage and review your interview progress here <Redo className="w-6 h-6 text-blue-500 animate-caret-blink"/></p>
      </div>

      {/* Empty State */}
      {interviewList?.length === 0 ? (
        <div className="flex flex-col items-center mt-10 gap-4 p-8 bg-white/60 rounded-lg shadow-md animate-fadeUp">
          <h3 className="text-lg font-semibold text-gray-600 animate-bounce">
            You haven’t created any interviews yet! 🤔
          </h3>
          <Link href="/dashboard/create-interview" passHref>
            <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-2 px-5 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              + Create New Interview
            </Button>
          </Link>
        </div>
      ) : (
        <>
          {/* Interview Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
            {interviewList?.slice(0, visibleCount).map((interview, index) => (
              <InterviewCards 
                key={index}
                interview={interview}
                viewDetail={true}
              />
            ))}
          </div>

          {/* Load More Button */}
          {visibleCount < interviewList?.length && (
  <div className="flex flex-col justify-center items-center mt-8 space-y-4">
    <Button 
      onClick={handleLoadMore}
      className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white py-2 px-6 rounded-full shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer animate-buttonEntrance"
    >
      Load More Interviews
    </Button>

    <div className="text-center">
      <ArrowDownFromLine className="w-6 h-6 text-teal-500 animate-bounce" />
    </div>
  </div>
)}

        </>
      )}
    </div>
  );
}

export default ScheduledInterview;
