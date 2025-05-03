'use client';

import { useCallListStore } from "@/app/stores/useCallListStore";
import { Button } from "@/components/ui/button";
import { CalendarCheck, Clock, Loader2, Mail, Trash2Icon, TrophyIcon, User2 } from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";

export default function CreateCallPage() {
  const callList = useCallListStore((state) => state.callList);
  const [loadingId, setLoadingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const updateCandidateStatus = useCallListStore((state) => state.updateCandidateStatus);
  const deleteCandidate = useCallListStore((state) => state.deleteCandidate);
  const [deletingId, setDeletingId] = useState(null);
  const rehydrateCallList = useCallListStore((state) => state.rehydrateCallList);

  useEffect(() => {
     const timer = setTimeout(() => setLoading(false), 1000);
     return () => clearTimeout(timer);
  },[]);

  useEffect(() => {
    rehydrateCallList();
  }, [rehydrateCallList]);

const handleSendEmail = (email) => {
  setLoadingId(email);
  updateCandidateStatus(email, "Pending");

  const subject = encodeURIComponent("You're invited to an Interview");
  const body = encodeURIComponent(
    "Hi there,\n\nYou've been invited to an interview at [Your Company Name].\n\n- For a face-to-face interview, please visit us at the following address:\n[Insert Company Address Here]\n\n- For a remote interview, kindly send your preferred contact details (such as your Telegram or WhatsApp number or ID) to this email.\n\nWe look forward to speaking with you!\n\nThank you,\n[Your Company Name or Team Name]"
  );
  

  setTimeout(() => {
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
    window.open(gmailUrl, "_blank");
    useCallListStore.getState().updateCandidateStatus(email, "Invitation Sent");
  }, 1500); 

  
  setTimeout(() => {
    setLoadingId(null);
  }, 3000);
};

  useEffect(() => {}, [callList]);

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
          <span>
            Loading <span className="arrow animate-bounce">...</span>
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-0 max-w-8xl mx-10">
      {/* Header Section */}
      <header className="sticky top-0 z-40 bg-white/30 backdrop-blur-md border-b border-white/10 py-6 mb-10 rounded-2xl ">
      <h2 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 mb-1 tracking-wide">
  Candidate Call List
</h2>
  <p className="text-center text-sm sm:text-xs md:text-sm lg:text-base text-gray-700">
    Easily invite selected candidates to interviews
  </p>
</header>


      {/* Main Content */}
      {callList.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {callList.map((candidate, index) => (
            <div
              key={index}
              className="relative bg-white rounded-2xl shadow-xl transform hover:scale-105 transition-all hover:shadow-2xl border border-gray-100 p-6"
            >
               {(candidate.status || "Not Invited") && (
                <div
                  className={`absolute top-4 right-4 text-xs font-bold px-2 py-1 rounded-full shadow-md
                    ${
                      candidate.status === "Invitation Sent"
          ? "bg-green-100 text-green-700 animate-status-in"
          : candidate.status === "Pending"
          ? "bg-yellow-100 text-orange-400 animate-status-in"
          : "bg-rose-100 text-rose-500 animate-status-in"
                    }`}
                >
                  {candidate.status || "Not Invited"}
                </div>
              )}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                {/* Left side: Candidate info */}
                <div className="space-y-3 text-gray-800">
                  <div className="flex items-center gap-3">
                    <User2 className="text-purple-500 w-5 h-5" />
                    <p className="font-semibold">{candidate.userName || "N/A"}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="text-stone-800 w-5 h-5" />
                    <p className="break-all text-sm text-gray-600">{candidate.userEmail || "N/A"}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <CalendarCheck className="text-sky-500 w-5 h-5" />
                    <p className="text-sm">
                      {candidate.created_at ? moment(candidate.created_at).format("MMM DD, yyyy") : "N/A"}
                    </p></div>
                    <div className="flex items-center gap-3">
                    <Clock className="text-yellow-500 w-5 h-5" />
                    <p className="text-sm">
                      {candidate.created_at ? moment(candidate.created_at).format("HH:mm:ss") : "N/A"}
                    </p>
                  </div>
                </div>

                {/* Right side: Rating */}
                <div className="flex items-center gap-3">
                  <TrophyIcon className="text-yellow-500 w-6 h-6" />
                  <p
                    className={`text-xl font-bold ${
                      candidate?.feedback?.feedback?.rating?.totalRating < 5
                        ? 'text-red-500'
                        : 'text-emerald-500'
                    }`}
                  >
                    {candidate?.feedback?.feedback?.rating?.totalRating ?? "Pending"}
                  </p>
                </div>
              </div>
              <div className="mt-4">
  <div className="flex items-center justify-between">
    <Button
      variant="outline"
      className={`flex items-center gap-1 px-5 py-4 bg-white/10 backdrop-blur-lg
        border border-gray-300 rounded-xl transition-all duration-300 shadow-lg
        cursor-pointer hover:scale-105 hover:bg-black hover:text-white hover:shadow-xl
        ${loadingId === candidate.userEmail ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={() => handleSendEmail(candidate.userEmail)}
      disabled={loadingId === candidate.userEmail}
      aria-label="Send interview invitation"
    >
      {loadingId === candidate.userEmail ? (
        <>
          <Loader2 className="animate-spin h-4 w-4 text-blue-500" />
          Redirect to gmail...
        </>
      ) : (
        'Send Interview Invitation'
      )}
    </Button>

    <Button
      variant="outline"
      className={`flex items-center gap-1 px-5 py-4 backdrop-blur-lg
        border border-gray-300 rounded-xl transition-all duration-300 shadow-lg
        cursor-pointer hover:scale-105 hover:bg-rose-100 hover:text-white hover:shadow-xl
        ${deletingId === candidate.userEmail ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={async () => {
          setDeletingId(candidate.userEmail);
          await new Promise((res) => setTimeout(res, 1000));
          await deleteCandidate(candidate.userEmail);
          setDeletingId(null);
        }}
        disabled={deletingId === candidate.userEmail}
        aria-label="Delete candidate"
    >
      {deletingId === candidate.userEmail ? (
    <>
      <Loader2 className="animate-spin h-4 w-4 text-rose-500" />
      Deleting...
    </>
  ) : (
    <>
      <Trash2Icon className="size-5 text-rose-500" />
    </>
  )}
</Button>
  </div>

  {loadingId === candidate.userEmail && (
    <div className="mt-2 text-sm text-gray-500">
      Please wait, sending invitation...
    </div>
  )}
</div>


              
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">No candidates added yet.</p>
      )}
    </div>
  );
}
