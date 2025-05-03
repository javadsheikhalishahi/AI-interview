"use client";

import {
  ArrowLeft,
  MessageCircleQuestion,
  Pencil,
  ShieldCheck,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import FormContainer from "./_components/FormContainer";
import InterviewLink from "./_components/InterviewLink";
import QuestionList from "./_components/QuestionList";

function CreateInterview() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState();
  const [interviewId, setInterviewId] = useState();
  const [questionList, setQuestionList] = useState([]);
  const onHandleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    console.log("FormData", formData);
  };

  const onGoToNext = () => {
    if (
      !formData?.JobPosition ||
      !formData?.JobDescription ||
      !formData?.InterviewDuration ||
      !formData.type
    ) {
      toast("Please fill out all the required fields!");
      return;
    }
    setStep(step + 1);
  };

  const onCreateLink = (interview_id, questions) => {
    setInterviewId(interview_id);
    setQuestionList(questions);
    setStep(step + 1);
  };

  return (
    <div>
      {/* Header and progress container */}
      <div className="mt-3 px-5 sm:px-10 md:px-24 lg:px-44 xl:px-96">
        <div className="relative -space-y-5 animate-fadeInUp">
          <button
            onClick={() => router.back()}
            className="p-2 cursor-pointer rounded-2xl bg-blue-100 backdrop-blur-md border border-white/20 hover:bg-white/20 hover:scale-110 transition-all duration-300 shadow-md hover:shadow-blue-500/40 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-blue-500 transition-all duration-300 hover:text-blue-700" />
          </button>

          <h2 className="relative bottom-10 text-center text-sm sm:text-xl md:text-lg lg:text-3xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 bg-clip-text text-transparent tracking-tight drop-shadow-md animate-fadeIn">
            Create a New Interview
          </h2>
        </div>
        <div className="w-full max-w-7xl mx-auto px-1 mt-6">
          <div className="flex justify-between items-center relative">
            {[1, 2, 3].map((n, idx) => {
              const isActive = step === n;
              const isComplete = step > n;
              const isReached = step >= n;

              const Icon = [Pencil, MessageCircleQuestion, ShieldCheck][idx];
              const label = ["Details", "Questions", "Finalize"][idx];

              const colors = {
                1: {
                  gradient: "from-blue-500 to-indigo-500",
                  text: "text-blue-600",
                  bg: "bg-blue-100",
                  border: "border-blue-500",
                },
                2: {
                  gradient: "from-purple-500 to-fuchsia-500",
                  text: "text-purple-600",
                  bg: "bg-purple-100",
                  border: "border-purple-500",
                },
                3: {
                  gradient: "from-green-500 to-emerald-500",
                  text: "text-emerald-600",
                  bg: "bg-emerald-100",
                  border: "border-emerald-500",
                },
              };

              const currentColors = colors[n];

              return (
                <div
                  key={n}
                  className="flex-1 flex flex-col items-center relative"
                >
                  {/* Connecting Line */}
                  {idx !== 0 && (
                    <div className="absolute -left-1/2 top-5 w-full h-1 z-0">
                      <div
                        className={`h-full transition-all rounded-full duration-700 ${
                          step >= n
                            ? `bg-gradient-to-r ${colors[n].gradient}`
                            : "bg-muted"
                        }`}
                      />
                    </div>
                  )}

                  {/* Icon Circle */}
                  <div
                    className={`w-10 h-10 flex items-center justify-center rounded-full border-2 shadow-md z-10 transition-all duration-300 ${
                      isActive
                        ? `bg-gradient-to-br ${currentColors.gradient} text-white border-transparent animate-bounce`
                        : isComplete || isReached
                        ? `${currentColors.bg} ${currentColors.border} ${currentColors.text}`
                        : "bg-muted text-muted-foreground border-muted"
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Step Number */}
                  <span
                    className={`mt-2 text-sm font-bold ${
                      isActive || isReached
                        ? currentColors.text
                        : "text-muted-foreground"
                    }`}
                  >
                    Step {n}
                  </span>

                  {/* Step Label */}
                  <span
                    className={`text-xs ${
                      isActive
                        ? "text-foreground font-semibold"
                        : "text-muted-foreground"
                    }`}
                  >
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {step == 1 ? (
          <FormContainer
            onHandleInputChange={onHandleInputChange}
            GoToNext={() => onGoToNext()}
          />
        ) : step == 2 ? (
          <QuestionList
            formData={formData}
            onCreateLink={(interview_id, questions) =>
              onCreateLink(interview_id, questions)
            }
            setQuestionList={setQuestionList}
          />
        ) : step == 3 ? (
          <InterviewLink
            interview_id={interviewId}
            formData={formData}
            questionList={questionList}
            onReset={() => {
              setStep(1);
              setFormData({});
              router.replace("/dashboard/create-interview");
            }}
          />
        ) : null}
      </div>
    </div>
  );
}

export default CreateInterview;
