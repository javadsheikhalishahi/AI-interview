"use client";

import { useUser } from "@/app/provider";
import { Button } from "@/components/ui/button";
import { supabase } from "@/services/supabaseClient";
import { Brain, GalleryVerticalEnd } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import InterviewCards from "./InterviewCards";

function LatestInterviewsList() {
  const [interviewList, setInterviewList] = useState([]);
  const {user} = useUser();

  useEffect(() => {
    user && GetInterviewList()
  }, [user])
  
  const GetInterviewList = async() => {
    let { data: Interviews, error } = await supabase
      .from('interviews')
      .select('*')
      .eq('userEmail', user?.email)
      .order('id', {ascending:false})
      .limit(8);

    console.log(Interviews);
    setInterviewList(Interviews);
  }


  return (
    <div className="my-5 p-1 animate-fadeIn">
       <hr className="mb-7 " />
       <h2 className="text-3xl font-extrabold text-black ml-2 flex items-center gap-3 animate-slideInTop">
  <GalleryVerticalEnd className="w-7 h-7 text-blue-500 animate-bounce" />
  Latest Interviews
</h2>

     
      {interviewList?.length == 0 && 
        <div className="flex flex-col items-center mt-5 gap-3 p-5 animate-fadeUp">
          <Brain className="h-10 w-10 text-purple-600 bounce-in duration-300" />
          <h2 className="text-center font-bold text-gray-500 ">
            You haven’t created any AI Interviews yet! <Image src="/Notfound.svg" alt="not found" width={500} height={500}/>
          </h2>
          <Link href="/dashboard/create-interview" passHref>
            <Button className="flex items-center justify-center gap-2 py-3 text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-lg shadow-xl transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer animate-buttonEntrance animate-pulseGlow">
              + Create New Interview
            </Button>
          </Link>
        </div>
      }
      {interviewList && 
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6">
           {interviewList.map((interview, index) => (
            <InterviewCards interview={interview} key={index} showCandidates={false}/>
           ))}
        </div>
       }
       <hr className="mt-10"/>
       <footer className="glassmorphism text-black py-10 mt-5 rounded-xl">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 text-center md:text-left">
          
          {/* Dashboard Footer Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Manage Your Interviews</h3>
            <p className="mt-2 text-sm text-gray-700">
              View and manage all your interviews in one place. You can create, review, and continue your interviews anytime.
            </p>
          </div>
          
          {/* Create Interview Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Create Interview</h3>
            <p className="mt-2 text-sm text-gray-700">
              Ready to start? Quickly set up new interviews and get started with ease.
            </p>
            <Link href="/dashboard/create-interview" passHref>
              <span className="text-blue-500 hover:text-blue-600 transition-all duration-300 mt-3 inline-block">
                + Create New Interview
              </span>
            </Link>
          </div>

          {/* Latest Interviews Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Latest Interviews</h3>
            <p className="mt-2 text-sm text-gray-700">
              Stay updated with the latest interviews you've created. Manage them efficiently.
            </p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-10 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} AIQuestify. All rights reserved.</p>
        </div>
      </div>
    </footer>
    </div>
  );
}

export default LatestInterviewsList;
