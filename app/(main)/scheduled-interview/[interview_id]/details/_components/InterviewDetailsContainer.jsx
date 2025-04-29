'use client';

import { BoomBox, Briefcase, CalendarCheck, Command, ListCollapseIcon, NotebookText, ShieldQuestion, Timer } from "lucide-react";
import moment from "moment";

function InterviewDetailsContainer({ interviewDetails }) {
  let interviewType = "N/A";
  try {
    const parsedType = JSON.parse(interviewDetails?.type || "[]");
    if (Array.isArray(parsedType) && parsedType.length > 0) {
      interviewType = parsedType.join(", ");
    }
  } catch {
    if (typeof interviewDetails?.type === "string") {
      interviewType = interviewDetails.type;
    }
  }

  return (
    <div className="p-7 mt-8 rounded-3xl bg-white/80 backdrop-blur-md shadow-xl border border-gray-100">
      {/* Job Position */}<div className="flex items-center gap-3 mb-10">
  <Briefcase className="w-6 h-6 text-amber-800" />
  <h1 className="text-3xl font-extrabold text-gray-800">
    {interviewDetails?.JobPosition || "Untitled Interview"}
  </h1>
</div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <StatCard icon={<Timer className="h-5 w-5 text-yellow-500" />} label="Duration" value={interviewDetails?.InterviewDuration || "N/A"} />
        <StatCard icon={<CalendarCheck className="h-5 w-5 text-sky-500" />} label="Created On" value={interviewDetails?.created_at ? moment(interviewDetails.created_at).format('MMM DD, YYYY') : "N/A"} />
        <StatCard icon={<ListCollapseIcon className="h-5 w-5 text-purple-500" />} label="Questions" value={interviewDetails?.questionList?.length || 0} />
        <StatCard icon={<Command className="h-5 w-5 text-emerald-500" />} label="Type" value={interviewType} />
      </div>

      {/* Job Description */}
      <div className="mt-10">
  <div className="flex items-center gap-2 mb-5">
    <BoomBox className="w-6 h-6 text-blue-500" />
    <h2 className="text-xl font-extrabold text-gray-700 tracking-tight">
      Job Description
    </h2>
  </div>

  <div className="p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
    <p className="text-gray-600 text-[15px] leading-7">
      {interviewDetails?.JobDescription || "No description provided."}
    </p>
  </div>
</div>


      {/* Interview Questions */}
      <div className="mt-10">
      <div className="flex items-center gap-3 mb-6">
    <NotebookText className="w-6 h-6 text-purple-500" />
    <h2 className="text-xl font-extrabold text-gray-700 tracking-tight">Interview Questions</h2>
  </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {interviewDetails?.questionList?.length > 0 ? (
            interviewDetails.questionList.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 bg-white rounded-lg border shadow-sm hover:shadow-md transition duration-200"
              >
                <ShieldQuestion className="h-5 w-5 mt-1 text-blue-500" />
                <span className="text-sm text-gray-700">
                  <span className="font-semibold">{index + 1}.</span> {item?.question || "No question text"}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No questions available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default InterviewDetailsContainer;

// StatCard component to keep top stats clean
function StatCard({ icon, label, value }) {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
      <div className="bg-white p-2 rounded-full shadow-inner">
        {icon}
      </div>
      <h3 className="text-xs text-gray-400 mt-2">{label}</h3>
      <p className="text-sm font-semibold text-gray-700 mt-1">{value}</p>
    </div>
  );
}
