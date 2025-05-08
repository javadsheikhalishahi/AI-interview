'use client';

import { useUser } from "@/app/provider";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { supabase } from "@/services/supabaseClient";
import Link from "next/link";
import { useEffect, useState } from "react";
import InterviewCards from "../dashboard/_components/InterviewCards";

function AllInterview() {
  const [interviewList, setInterviewList] = useState([]);
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const interviewsPerPage = 12;
  const [totalInterviews, setTotalInterviews] = useState(0);

  useEffect(() => {
    if (user) {
      getInterviewList();
    }
  }, [user, page]);

  const getInterviewList = async () => {
    setLoading(true);
    const { data: Interviews, error, count } = await supabase
      .from("interviews")
      .select("*", { count: "exact" })
      .eq("userEmail", user?.email)
      .order("id", { ascending: false })
      .range((page - 1) * interviewsPerPage, page * interviewsPerPage - 1);

    if (!error) {
      setInterviewList(Interviews);
      setTotalInterviews(count || 0);
    } else {
      console.error("Fetch error:", error);
    }

    setLoading(false);
  };

  const totalPages = Math.ceil(totalInterviews / interviewsPerPage);

  const handlePageClick = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setPage(pageNumber);
    }
  };

  if (loading) {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center glassmorphism-1 bg-opacity-40 z-50">
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

  return (
    <div className="p-1 animate-fadeIn">
    <div className="w-full text-center p-6 md:p-2 rounded-xl text-gray-800 flex items-center justify-center bg-transparent transition-all duration-300 ease-in-out">
  <div className="flex items-center gap-4 justify-center">
    <svg
      className="w-10 h-10 text-blue-600 transition-transform transform hover:scale-110 hover:rotate-12 duration-300 animate-wiggle"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16h6m2 0a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v7a2 2 0 002 2h1l2 3h4l2-3h1z" />
    </svg>
    <div>
      <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">Your Interviews</h1>
      <p className="text-sm text-gray-500 mt-2">All the interviews you've created in one place</p>
    </div>
  </div>
</div>


<hr className="mt-3" />
      {interviewList?.length === 0 ? (
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
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
            {interviewList.map((interview, index) => (
              <InterviewCards interview={interview} key={index} showCandidates={false}  />
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" onClick={() => handlePageClick(page - 1)}  className='hover:bg-gray-300' />
                </PaginationItem>

                {[...Array(totalPages)].map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      href="#"
                      onClick={() => handlePageClick(i + 1)}
                      className={page === i + 1 ? "bg-blue-500 text-white rounded-full hover:bg-black hover:text-white" : ""}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                {totalPages > 6 && <PaginationEllipsis />}

                <PaginationItem>
                  <PaginationNext href="#" onClick={() => handlePageClick(page + 1)} className='hover:bg-gray-300' />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
          <div className="mt-12 text-center text-gray-500 text-sm animate-fadeIn">
  <p>
    This page displays all your created interviews. You can manage, review, and continue them anytime.
  </p>
  <p className="mt-1">
    Need help? <Link href="/support" className="text-blue-500 hover:underline">Contact support</Link>.
  </p>
</div>
        </>
      )}
    </div>
  );
}

export default AllInterview;
