import axios from "axios";
import { LoaderPinwheel } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function QuestionList({ formData }) {

  const [loading, setLoading] = useState(true);
  const [questionList, setQuestionList] = useState();

    useEffect (() => {
      if (formData)
        {
            GenerateQuestionList()
        }
    }, [formData])

    const GenerateQuestionList = async() => {
      setLoading(true);
      try {
       const result = await axios.post('/api/ai-model',{
           ...formData,
       });
       
       console.log(result.data.content);
       const Content = JSON.parse(result.data.content);
       setQuestionList(Content);
       setLoading(false);
    }
    catch(e) {
      toast('Server Error, Try Again!!')
      setLoading(false);
    }
  }

  return (
    <div>
      {loading && 
       <div className="flex bg-white items-center border border-blue-600 rounded-2xl p-6 gap-2 mt-5">
         <LoaderPinwheel className="animate-spin w-8 h-8 text-blue-600" />
         <div className="pl-2">
           <h2 className="font-medium animate-pulse">Generating Interview Questions <span className="animate-caret-blink">...</span></h2>
           <p className="text-blue-500 mt-1 font-bold">Sit tight—our AI is cooking up custom interview questions for your position.</p>
         </div>
       </div>
      }
    </div>
  )
}

export default QuestionList
