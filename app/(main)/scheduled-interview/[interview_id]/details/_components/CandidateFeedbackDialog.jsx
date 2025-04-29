import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { ThumbsDown, Trophy } from "lucide-react";

function CandidateFeedbackDialog({ candidate }) {
  const feedback = candidate?.feedback?.feedback;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="text-blue-600 border-blue-300 hover:bg-blue-50 hover:scale-[1.02] transition-transform"
        >
          View Report
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[95vw] max-w-md sm:max-w-2xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 animate-fadeIn">
            Interview Feedback
          </DialogTitle>

          <DialogDescription asChild>
            <div className="mt-4 sm:mt-6 space-y-6 text-gray-700 text-sm sm:text-base">
              {/* Candidate Info */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 animate-fadeUp">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-500 font-bold text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-base sm:text-lg shadow-md">
                    {candidate.userName[0]}
                  </div>
                  <div>
                    <h2 className="font-semibold text-black">{candidate?.userName}</h2>
                    <h3 className="text-xs sm:text-sm text-gray-400">
                      {candidate?.userEmail}
                    </h3>
                  </div>
                </div>
                <h2
  className={`flex items-center gap-3 font-bold text-xl sm:text-2xl ${
    feedback?.rating?.totalRating < 5
      ? "text-rose-500"
      : "text-emerald-600"
  }`}
>
{feedback?.rating?.totalRating < 5 ? (
    <ThumbsDown className="w-6 h-6 text-rose-500" />
  ) : (
    <Trophy className="w-6 h-6 text-yellow-500" />
  )}
  {feedback?.rating?.totalRating}/10
</h2>


              </div>

              {/* Skills Assessment */}
              <div className="animate-slideInRight1">
                <h2 className="font-bold mb-3 text-black">Skills Assessment</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {[
                    { label: "Technical Skills", value: feedback?.rating.technicalSkills },
                    { label: "Problem Solving", value: feedback?.rating.ProblemSolving },
                    { label: "Communication", value: feedback?.rating.communication },
                    { label: "Experience", value: feedback?.rating.experience },
                    { label: "Total Rating", value: feedback?.rating.totalRating },
                  ].map((item, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-xs sm:text-sm font-medium mb-1">
                        <span>{item.label}</span>
                        <span>{item.value}/10</span>
                      </div>
                      <Progress value={item.value * 10} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Performance Summary */}
              <div className="animate-slideInRight2">
                <h2 className="font-bold text-black mb-2">Performance Summary</h2>
                <div className="bg-gray-100 p-3 sm:p-4 rounded-md space-y-2 leading-relaxed text-xs sm:text-sm">
                  {Array.isArray(feedback?.summery) ? (
                    feedback.summery.map((summery, index) => (
                      <p key={index}>• {summery}</p>
                    ))
                  ) : typeof feedback?.summery === "string" ? (
                    feedback.summery
                      .split(".")
                      .filter(Boolean)
                      .map((line, index) => <p key={index}>• {line.trim()}.</p>)
                  ) : (
                    <p>No performance summary available.</p>
                  )}
                </div>
              </div>

              {/* Recommendation */}
              <div
                className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 rounded-md p-4 animate-slideInRight3 ${
                  feedback?.Recommendation === "No"
                    ? "bg-rose-100"
                    : "bg-emerald-100"
                }`}
              >
                <div>
                  <h2
                    className={`font-semibold ${
                      feedback?.Recommendation === "No"
                        ? "text-rose-600"
                        : "text-emerald-600"
                    }`}
                  >
                    Recommendation:
                  </h2>
                  <p
                    className={`mt-1 text-sm ${
                      feedback?.Recommendation === "No"
                        ? "text-rose-500"
                        : "text-emerald-500"
                    }`}
                  >
                    {feedback?.RecommendationMsg}
                  </p>
                </div>
                <Button
                  className={`w-full sm:w-auto ${
                    feedback?.Recommendation === "No"
                      ? "bg-rose-600 hover:bg-rose-700"
                      : "bg-emerald-600 hover:bg-emerald-700"
                  } text-white`}
                >
                  {feedback?.Recommendation === "No"
                    ? "Not Eligible"
                    : "Eligible for Hiring"}
                </Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default CandidateFeedbackDialog;
