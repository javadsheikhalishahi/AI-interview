"use client";

import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  MessageCircleQuestion,
  Pencil,
  ShieldCheck,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import Welcome from "../_components/Welcome";
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
      <Welcome />

      {/* Header and progress container */}
      <div className="mt-4 px-5 sm:px-10 md:px-24 lg:px-44 xl:px-96">
        <div className="flex items-center gap-4">
          <ArrowLeft
            onClick={() => router.back()}
            className="cursor-pointer hover:scale-125 hover:text-blue-600 transition-transform"
          />
          <h2 className="font-bold sm:text-lg md:text-xl lg:text-2xl">
            Create New Interview
          </h2>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground font-medium">
          {step === 1 && <Pencil className="w-6 h-6 text-blue-500" />}
          {step === 2 && (
            <MessageCircleQuestion className="w-6 h-6 text-purple-500" />
          )}
          {step === 3 && <ShieldCheck className="w-6 h-6 text-emerald-500" />}
          <span>Step {step} of 3</span>
        </div>

        {/* Smaller Progress Bar */}
        <Progress
          value={step * 33.33}
          className="h-2 mt-4 max-w-7xl rounded-full overflow-hidden shadow-xl transition-all duration-500
  [&>*]:bg-gradient-to-r [&>*]:from-blue-500 [&>*]:to-indigo-600 animate-pulseGlow"
        />
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
