import { useCallListStore } from "@/app/stores/useCallListStore";
import { Button } from "@/components/ui/button";
import { ArrowRight, CalendarCheck, Clock, Phone } from "lucide-react";
import md5 from "md5";
import moment from "moment";
import Image from "next/image";
import { toast } from "sonner";
import CandidateFeedbackDialog from "./CandidateFeedbackDialog";

const getGravatarUrl = (email) => {
  const emailHash = md5(email.trim().toLowerCase());
  return `https://www.gravatar.com/avatar/${emailHash}?d=mp&s=200`;
};

function CandidatesList({ candidateList }) {

  const { callList, addToCallList } = useCallListStore();

  const handleAddToCall = (candidate) => {
    // Check if the candidate is already in the call list
    const isAlreadyInCallList = callList.some((existingCandidate) => existingCandidate.userEmail === candidate.userEmail);
    
    if (!isAlreadyInCallList) {
      addToCallList(candidate);
      toast.success(`${candidate.userName} added to call list.`);
    } else {
      toast.error(`${candidate.userName} is already in the call list.`);
    }
  };
  

  return (
    <div className="p-4">
      <h2 className="font-extrabold text-xl my-6">
        Candidates ({candidateList?.length})
      </h2>
      {candidateList?.map((candidate, index) => {
        const feedback = candidate?.feedback?.feedback;

        return (
          <div
            key={index}
            className="flex flex-col sm:flex-row sm:items-center justify-between bg-white rounded-2xl shadow-xl p-5 gap-5 mt-5"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full">
              {/* Avatar */}
              {candidate?.userEmail ? (
                <Image
                  src={getGravatarUrl(candidate.userEmail)}
                  alt={candidate.userName}
                  width={48}
                  height={48}
                  className="rounded-full shadow-md border border-gray-200 object-cover"
                />
              ) : (
                <div className="bg-blue-500 font-bold text-white rounded-full w-12 h-12 flex items-center justify-center text-lg shadow-md border border-gray-200">
                  {candidate.userName[0]}
                </div>
              )}

              {/* Info */}
              <div className="flex flex-col">
                <h2 className="font-bold text-base">{candidate?.userName}</h2>
                <h3 className="text-xs text-gray-500 break-words">{candidate?.userEmail}</h3>

                {feedback?.rating?.totalRating ? (
                  <h2 className="text-sm text-gray-400 flex flex-wrap items-center gap-2 mt-1">
                    Completed On <ArrowRight className="w-4 h-4 text-black" />
                    <CalendarCheck className="w-4 h-4 text-sky-500" />
                    {moment(candidate?.created_at).format("MMM DD, yyyy")}
                    <Clock className="w-4 h-4 text-yellow-400" />
                    {moment(candidate?.created_at).format("HH:mm:ss")}
                  </h2>
                ) : (
                  <h2 className="text-sm text-yellow-500 font-medium mt-1">Awaiting Feedback</h2>
                )}
              </div>
            </div>

            {/* Rating + Dialog */}
            <div className="flex items-center justify-between sm:justify-end gap-6 sm:w-auto w-full">
              {feedback?.rating?.totalRating ? (
                <h2 className="text-emerald-500 font-bold">{feedback.rating.totalRating}/10</h2>
              ) : (
                <h2 className="text-yellow-500 font-bold animate-pulse">Pending</h2>
              )}
              <CandidateFeedbackDialog candidate={candidate} />
            </div>
            <Button
  onClick={() => handleAddToCall(candidate)}
  variant="outline"
  aria-label="Add candidate to call"
  className="flex items-center gap-1 bg-white text-emerald-500 border-emerald-500 hover:bg-emerald-500
 hover:text-white hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2
  focus:ring-emerald-500 rounded-lg p-2 cursor-pointer"
>
  <Phone className="w-5 h-5" />
  <span>Add to Call</span>
</Button>


          </div>
        );
      })}
    </div>
  );
}

export default CandidatesList;
