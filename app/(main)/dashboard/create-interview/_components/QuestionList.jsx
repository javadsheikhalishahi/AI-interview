import { useUser } from "@/app/provider";
import { Button } from "@/components/ui/button";
import { supabase } from "@/services/supabaseClient";
import axios from "axios";
import {
  ArrowDown,
  ArrowUp,
  BrainCircuit,
  CornerRightDown,
  Loader2,
  LoaderPinwheel,
  Sparkles
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

function QuestionList({ formData, onCreateLink }) {
  const [loading, setLoading] = useState(true);
  const [questionList, setQuestionList] = useState([]);
  const { user } = useUser();
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    if (formData) {
      GenerateQuestionList();
    }
  }, [formData]);

  const GenerateQuestionList = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/ai-model", {
        ...formData,
      });

      console.log(result.data.content);
      const Content = result.data.content;
      const FINAL_CONTENT = Content.replace("```json", "").replace("```", "");
      setQuestionList(JSON.parse(FINAL_CONTENT)?.interviewQuestions);
      setLoading(false);
    } catch (e) {
      toast("Server Error, Try Again!!");
      setLoading(false);
    }
  };

  const onFinish = async () => {
    setSaveLoading(true);
    const interview_id = uuidv4();
    const { data, error } = await supabase
      .from("interviews")
      .insert([
        {
          ...formData,
          questionList: questionList,
          userEmail: user?.email,
          interview_id: interview_id,
        },
      ])
      .select();

    setSaveLoading(false);

    onCreateLink(interview_id, questionList);

  };

  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showScrollDown, setShowScrollDown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      setShowScrollTop(scrollTop > 100);
      setShowScrollDown(scrollTop + windowHeight < docHeight - 100);
    };

    handleScroll(); // Check on mount
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {loading && (
        <div className="flex bg-white items-center border border-blue-600 rounded-2xl p-6 gap-2 mt-6">
          <LoaderPinwheel className="animate-spin w-8 h-8 text-blue-600" />
          <div className="pl-2">
            <h2 className="font-medium animate-pulse">
              Generating Interview Questions{" "}
              <span className="animate-caret-blink">...</span>
            </h2>
            <p className="text-blue-500 mt-1 font-bold">
              Sit tight—our AI is cooking up custom interview questions for your
              position.
            </p>
          </div>
        </div>
      )}
      {questionList?.length > 0 && (
        <div className="animate-fadeIn">
          <h2 className="flex text-gray-800 items-center text-xl font-bold mt-5 gap-2">
            <BrainCircuit className="text-purple-500 w-7 h-7" />
            Generated Interview Questions{" "}
            <CornerRightDown className="w-6 h-6 mt-4" />
          </h2>
          <div className="bg-white border border-gray-300 rounded-2xl shadow-2xl shadow-gray-500 p-7 mt-5 space-y-5 animate-fadeUp">
            {questionList.map((item, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-stone-50 to-white border border-gray-300 rounded-2xl transition-all transform hover:scale-105 duration-300 shadow-lg p-4 mb-5"
                style={{
                  animation: `slideInRight 0.6s ease-out forwards`,
                  animationDelay: `${0.4 * index}s`,
                  opacity: 0,
                }}
              >
                <div className="text-xs text-gray-500 mb-1">
                  Question {index + 1}
                </div>
                <h2 className="flex items-center gap-2 font-semibold text-gray-800">
                  <Sparkles className="w-5 h-5 text-blue-500" />
                  {item.question}
                </h2>

                <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded-full mt-2">
                  {item?.type}
                </span>
              </div>
            ))}

            <div className="flex justify-end mt-8">
              <Button
                onClick={() => onFinish()}
                disabled={saveLoading}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-stone-900 to-black
           hover:from-blue-600 hover:to-indigo-700 rounded-lg transition duration-300 ease-in-out transform 
           hover:scale-105 cursor-pointer animate-buttonEntrance1 px-4 py-2 shadow-gray-700 shadow-md"
              >
                {saveLoading && <Loader2 className="animate-spin" />} Create
                Interview Link & Finish
                <span className="w-5 h-5 animate-bounce">🏅</span>
              </Button>
            </div>
          </div>
        </div>
      )}
             {/* Scroll Controls */}
      <div className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 flex flex-col gap-3 z-50">
        {showScrollDown && (
          <button
            onClick={scrollToBottom}
            className="bg-white text-blue-600 border border-blue-500 shadow-xl p-3 rounded-full hover:bg-blue-100 transition-all duration-300 cursor-pointer"
          >
            <ArrowDown className="w-5 h-5" />
          </button>
        )}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="bg-white text-purple-600 border border-purple-500 shadow-xl p-3 rounded-full hover:bg-purple-100 transition-all duration-300 cursor-pointer"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}

export default QuestionList;
