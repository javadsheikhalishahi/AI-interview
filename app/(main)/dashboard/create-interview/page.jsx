'use client';

import { Progress } from "@/components/ui/progress";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import Welcome from "../_components/Welcome";
import FormContainer from "./_components/FormContainer";
import QuestionList from "./_components/QuestionList";

function CreateInterview() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState();
  const onHandleInputChange = (field, value) => {
    setFormData(prev => ({
        ...prev,
        [field]: value
    }))

    console.log("FormData", formData);
  }

  const onGoToNext = () => {
    if(!formData?.JobPosition || !formData?.JobDescription || !formData?.InterviewDuration || !formData.type)
      {
        toast('Please fill out all the required fields!')
        return;
      }
      setStep(step + 1);
  }

  return (
    <div>
      <Welcome />

      {/* Header and progress container */}
      <div className="mt-10 px-5 sm:px-10 md:px-24 lg:px-44 xl:px-96">
        <div className="flex items-center gap-4">
          <ArrowLeft
            onClick={() => router.back()}
            className="cursor-pointer hover:scale-125 hover:text-blue-600 transition-transform"
          />
          <h2 className="font-bold sm:text-lg md:text-xl lg:text-2xl">
            Create New Interview
          </h2>
        </div>

        {/* Smaller Progress Bar */}
        <Progress value={step * 33.33} className="h-2 mt-4 max-w-7xl" />
        { step == 1 ? <FormContainer onHandleInputChange={onHandleInputChange}
        GoToNext={() => onGoToNext()} />
        : step == 2 ? <QuestionList formData={formData} /> : null}
      </div>
    </div>
  );
}

export default CreateInterview;
