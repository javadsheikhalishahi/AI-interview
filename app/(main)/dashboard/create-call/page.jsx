"use client";

import { useCallListStore } from "@/app/stores/useCallListStore";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CalendarCheck,
  Clock,
  IdCard,
  Loader2,
  Mail,
  Phone,
  Trash2Icon,
  TrophyIcon,
  User2,
} from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

export default function CreateCallPage() {
  const callList = useCallListStore((state) => state.callList);
  const [loadingId, setLoadingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const updateCandidateStatus = useCallListStore(
    (state) => state.updateCandidateStatus
  );
  const deleteCandidate = useCallListStore((state) => state.deleteCandidate);
  const [deletingId, setDeletingId] = useState(null);
  const rehydrateCallList = useCallListStore(
    (state) => state.rehydrateCallList
  );
  const [creatingCallId, setCreatingCallId] = useState(null);
  const updateCallId = useCallListStore((state) => state.updateCallId);
  const [callLink, setCallLink] = useState(null);
  const scheduledTimes = useCallListStore((state) => state.scheduledTimes);
  const setScheduledTime = useCallListStore((state) => state.setScheduledTime);
  const [candidateDates, setCandidateDates] = useState({});

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    rehydrateCallList();
  }, [rehydrateCallList]);

  useEffect(() => {
    const savedCandidateDates = JSON.parse(localStorage.getItem('candidateDates')) || {};
    // Convert ISO strings to Date objects
    const parsedDates = Object.fromEntries(
      Object.entries(savedCandidateDates).map(([email, dateString]) => [
        email,
        new Date(dateString),
      ])
    );
    setCandidateDates(parsedDates);
  }, []);
  

  // Persist candidate dates to localStorage (or sessionStorage) whenever they change
  useEffect(() => {
    if (Object.keys(candidateDates).length > 0) {
      localStorage.setItem('candidateDates', JSON.stringify(candidateDates));
    }
  }, [candidateDates]);

  const handleDateChange = (email, date) => {
    setCandidateDates((prev) => {
      const updatedDates = { ...prev, [email]: date };
      return updatedDates;
    });
  };

  const handleSendEmail = (email, callId) => {
    const candidate = callList.find((c) => c.userEmail === email);
    if (!candidate) {
      toast.error("Candidate not found.");
      return;
    }
    setLoadingId(email);
    updateCandidateStatus(email, "Pending");

    const subject = encodeURIComponent("You're invited to an Interview");
    const body = encodeURIComponent(
      `Hi there,\n\nYou've been invited to an interview at [Your Company Name].\n\n- For a face-to-face interview, please visit us at the following address:\n[Insert Company Address Here]\n\n- For a remote interview, kindly send your preferred contact details (such as your Telegram or WhatsApp number or ID) to this email,\n\n Or you can:\n\nTo join the remote interview in Date ${moment(candidateDates[candidate.userEmail]).format("MMM D, YYYY h:mm A")}, click the link below:\n\n"http://localhost:3000/room/${callId}"\n\nWe look forward to speaking with you!\n\nThank you,\n[Your Company Name or Team Name]\n\n PowerBy AIQuestify.`
    );

    setTimeout(() => {
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
      window.open(gmailUrl, "_blank");
      useCallListStore
        .getState()
        .updateCandidateStatus(email, "Invitation Sent");
    }, 1500);

    setTimeout(() => {
      setLoadingId(null);
    }, 3000);
  };

  const handleCreateCall = (email) => {
    const scheduledTime = candidateDates[email];
    const candidate = callList.find((c) => c.userEmail === email);

    if (!scheduledTime) {
      alert("Please select a date and time for this candidate's call!");
      return;
    }

    const callId = uuidv4();
    setCallLink(`https://yourapp.com/room/${callLink}`);
    updateCallId(email, callId, callLink);
    setScheduledTime(email, scheduledTime);
    setCreatingCallId(email);
    setTimeout(() => setCreatingCallId(null), 1000);
  };

  const handleJoinCall = (candidate) => {
    const currentTime = new Date();
    const scheduledTime = new Date(candidateDates[candidate.userEmail]);

    if (!scheduledTime) {
      toast.error("No scheduled time found for this candidate.");
      return;
    }
  
    if (currentTime < scheduledTime) {
      toast.error("You cannot join the call before the scheduled time.");
    } else {
      // Logic to join the call
      window.open(`/room/${candidate.callId}`, '_blank');
    }
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
      <header className="sticky top-0 z-40 bg-white/30 backdrop-blur-md border-b border-white/10 py-6 mb-10 rounded-2xl animate-fadeUp">
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 mb-1 tracking-wide">
          Candidate Call List
        </h2>
        <p className="text-center text-sm sm:text-xs md:text-sm lg:text-base text-gray-700">
          Easily invite selected candidates to interviews
        </p>
      </header>

     {/* Main Content */}
{callList.length > 0 ? (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 p-4 md:p-6 animate-slideInRight">
    {callList.map((candidate, index) => (
      <div
        key={index}
        className="relative bg-white rounded-xl shadow-xl hover:shadow-2xl hover:border hover:border-blue-500 transform transition-all duration-700 border border-gray-200 p-6 flex flex-col"
      >
        {(candidate.status || "Not Invited") && (
          <div
            className={`absolute top-5 right-5 text-xs font-medium px-2.5 py-1 rounded-full
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 animate-slideInRight1"> 
          {/* Left side: Candidate info */}
          <div className="space-y-2.5 text-gray-700 flex-grow"> 
            <div className="flex items-center gap-2.5"> 
              <User2 className="text-indigo-600 w-6 h-6 flex-shrink-0" /> 
              <p className="font-semibold text-gray-800 text-base"> 
                {candidate.userName || "N/A"}
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <Mail className="text-gray-600 w-5 h-5 flex-shrink-0" />
              <p className="break-all text-sm text-gray-600 transition-colors"> 
                {candidate.userEmail || "N/A"}
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <CalendarCheck className="text-sky-500 w-5 h-5 flex-shrink-0" />
              <p className="text-sm text-gray-600">
                {candidate.created_at
                  ? moment(candidate.created_at).format("MMM DD, YYYY")
                  : "N/A"}
              </p>
            </div>
            <div className="flex items-center gap-2.5">
              <Clock className="text-yellow-500 w-5 h-5 flex-shrink-0" />
              <p className="text-sm text-gray-600">
                {candidate.created_at
                  ? moment(candidate.created_at).format("h:mm A") 
                  : "N/A"}
              </p>
            </div>
          </div>

          {/* Right side: Rating */}
          <div className="flex items-center gap-2 mt-2 md:mt-0 flex-shrink-0 animate-slideInRight2"> 
            <TrophyIcon className={`w-8 h-8 ${ 
                candidate?.feedback?.feedback?.rating?.totalRating >= 7 ? "text-amber-500" :
                candidate?.feedback?.feedback?.rating?.totalRating >= 5 ? "text-amber-400" :
                candidate?.feedback?.feedback?.rating?.totalRating > 0 ? "text-gray-400" : "text-gray-300"
            }`} />
            <p
              className={`text-2xl font-bold ${
                candidate?.feedback?.feedback?.rating?.totalRating < 5 && candidate?.feedback?.feedback?.rating?.totalRating !== undefined 
                  ? "text-red-600"
                  : candidate?.feedback?.feedback?.rating?.totalRating >=5
                  ? "text-emerald-600" 
                  : "text-gray-500" 
              }`}
            >
              {candidate?.feedback?.feedback?.rating?.totalRating ?? <span className="text-sm font-medium text-orange-400">Pending...</span>} 
            </p>
          </div>
        </div>
        {candidate.callId && (
          <div className="mt-auto pt-3 text-xs text-gray-500 flex items-center gap-2 border-t border-gray-200"> 
            <IdCard className="w-5 h-5 text-sky-600 flex-shrink-0" />
            <span className="font-medium text-gray-600">ID:</span> <span className="truncate">{candidate.callId}</span> 
          </div>
        )}

        {/* Actions Separator */}
        <div className="border-t border-gray-200 mt-4 pt-4">
          <div className="flex flex-col space-y-3"> 
            <div className="w-full">
              <label
                htmlFor={`datePicker-${index}`}
                className="block text-xs font-medium text-gray-600 mb-1" 
              >
                Schedule Interview
              </label>
              <div className="relative">
                <DatePicker
                  id={`datePicker-${index}`}
                  selected={candidateDates[candidate.userEmail] || null}
                  onChange={(date) => handleDateChange(candidate.userEmail, date)}
                  showTimeSelect
                  placeholderText="Pick date & time"
                  dateFormat="MMM d, yyyy h:mm aa"
                  className="w-full rounded-lg border-gray-300 shadow-sm text-sm p-2.5 focus:ring-indigo-500 focus:border-indigo-500"
                  minDate={new Date()}
                />
              </div>
            </div>
            
            {candidateDates[candidate.userEmail] && (
              <p className="mt-1 text-xs text-emerald-700"> 
                Selected: {moment(candidateDates[candidate.userEmail]).format("MMM D, YYYY h:mm A")}
              </p>
            )}
            
            {/* Button group */}
            <div className="flex flex-col sm:flex-row items-center gap-2.5 mt-2 animate-slideInRight3"> 
              <Button
                variant="outline" 
                className={`w-full sm:w-auto flex items-center justify-center text-sm font-medium gap-1.5 px-4 py-2.5 bg-white/10 border
                border-gray-300 rounded-lg backdrop-blur-lg shadow-lg
                hover:bg-black hover:text-white transition-colors duration-300 hover:shadow-xl cursor-pointer hover:scale-105
                ${
                  loadingId === candidate.userEmail
                    ? "opacity-60 cursor-not-allowed"
                    : ""
                }`}
                onClick={() =>
                  handleSendEmail(
                    candidate.userEmail,
                    candidate.callId,
                    callLink
                  )
                }
                disabled={loadingId === candidate.userEmail}
                aria-label="Send interview invitation"
              >
                {loadingId === candidate.userEmail ? (
                  <>
                    <Loader2 className="animate-spin h-4 w-4 text-indigo-500" />
                    <span>Sending...</span> 
                  </>
                ) : (
                  "Send Invitation" 
                )}
              </Button>

              {candidate.callId ? (
                <Link
                  href={`/room/${candidate.callId}`}
                  target="_blank"
                  passHref
                  className="w-full sm:w-auto" 
                >
                  <Button 
                    variant="default"
                    className="w-full flex font-semibold items-center justify-center gap-1 bg-emerald-100 text-emerald-700 hover:bg-emerald-500
                    transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 hover:scale-105 hover:text-white
                    focus:ring-emerald-500 rounded-lg px-4 py-2.5 text-sm shadow-lg hover:shadow-md cursor-pointer border border-emerald-200" 
                  >
                    Join Call <ArrowRight className="w-4 h-4 arrow" /> 
                  </Button>
                </Link>
              ) : (
                <Button 
                  onClick={() => handleCreateCall(candidate.userEmail)}
                  disabled={creatingCallId === candidate.userEmail}
                  className={`w-full sm:w-auto flex items-center justify-center gap-1.5 bg-emerald-500 text-white hover:bg-emerald-600
                  transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2
                  focus:ring-emerald-500 rounded-lg px-4 py-2.5 text-sm font-semibold shadow-sm hover:shadow-md cursor-pointer hover:scale-105
                  ${creatingCallId === candidate.userEmail ? "opacity-60 cursor-not-allowed" : ""}`}
                >
                  <Phone className="w-4 h-4 shake" />
                  {creatingCallId === candidate.userEmail ? (
                    <>
                      <Loader2 className="animate-spin h-4 w-4 mr-1.5" /> 
                      Creating...
                    </>
                  ) : (
                    "Create Call"
                  )}
                </Button>
              )}
              <Button
                variant="outline" 
                className={`ml-auto flex-shrink-0 items-center justify-center gap-1 p-2.5 border-gray-300 text-rose-500 rounded-lg 
                hover:border-red-500 hover:bg-rose-50 hover:text-rose-600 transition-colors duration-200 shadow-sm hover:shadow-md cursor-pointer
                ${
                  deletingId === candidate.userEmail
                    ? "opacity-60 cursor-not-allowed"
                    : ""
                }`}
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
                  <Loader2 className="animate-spin h-5 w-5 text-rose-500" />
                ) : (
                  <Trash2Icon className="size-5" /> 
                )}
              </Button>
            </div>
            {loadingId === candidate.userEmail && (
              <div className="mt-2 text-xs text-indigo-600 text-center"> 
                Please wait, sending invitation...
              </div>
            )}
          </div>
        </div>
      </div>
    ))}
  </div>
) : (
  <div className="text-center text-gray-500 mt-16 p-8"> 
    <svg className="mx-auto h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
    </svg>
    <p className="text-lg font-medium text-gray-700">No candidates added yet.</p>
    <p className="text-sm text-gray-500 mt-1">Add a candidate to see them listed here.</p>
  </div>
)}
</div>
);}
