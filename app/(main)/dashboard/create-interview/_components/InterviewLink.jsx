import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CalendarCheck,
  Clock4,
  Copy,
  CopyCheck,
  LinkIcon,
  ListCollapseIcon,
  Plus,
  Share2,
  Undo2
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

function InterviewLink({ interview_id, formData, questionList, onReset }) {
  const url = process.env.NEXT_PUBLIC_HOST_URL + "/" + interview_id;

  const GetInterviewUrl = () => {
    return url;
  };

  const onCopyLink = async () => {
    await navigator.clipboard.writeText(url);
    toast.success("Link Copied");
  };

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 10000);
  };

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const [step, setStep] = useState(1);
  
  const router = useRouter();

const handleReset = () => {
  setStep(1);
  router.replace("/dashboard/create-interview");
};

  return (
    <div className="flex flex-col items-center justify-center mt-0 px-4 sm:px-6 md:px-10 animate-FadeIn">
      <Image
        src={"/Check.png"}
        alt="check"
        width={100}
        height={100}
        className="w-[50px] h-[50px] animate-pulse scale-100 "
      />
      <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-gray-800 mt-3 leading-snug animate-slideInRight1">
        🎉We’ve Cooked Up Your AI Interview! It`s Ready!!
      </h2>
      <p className="text-center mt-3 text-gray-500 font-semibold text-base sm:text-lg max-w-xl mx-auto">
        Share this link to candidates to initiate their AI-driven interview
      </p>

      <div className="w-full max-w-3xl bg-white border border-gray-300 shadow-2xl p-6 mt-6 rounded-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2">
    {/* Share Text with Icon */}
    <h2 className="font-bold text-lg">Interview Link</h2>
    <LinkIcon className="w-5 h-5 text-gray-700" />
  </div>
          <h2 className="text-blue-600 font-semibold bg-blue-50 rounded-xl p-1 px-3 text-sm w-fit">
            Valid for 30 Days
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center mt-4 gap-3">
          <Input defaultValue={GetInterviewUrl()} disabled={true} />
          <Button
            onClick={() => {
              onCopyLink();
              handleCopy();
            }}
            className="flex items-center justify-center gap-2 py-3 text-white
        bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700
        rounded-lg shadow-xl transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer animate-buttonEntrance"
          >
            {copied ? (
              <CopyCheck className="text-white" />
            ) : (
              <Copy className="text-white" />
            )}
            {copied ? "Copied!" : "Copy Link"}
          </Button>
        </div>
        <hr className="my-4" />
        <div className="flex flex-wrap gap-5">
          <h2 className="flex text-sm text-gray-500 items-center gap-2">
            <Clock4 className="h-4 w-4" /> {formData?.InterviewDuration}
          </h2>
          <h2 className="flex text-sm text-gray-500 items-center gap-2">
            <ListCollapseIcon className="h-4 w-4" /> {questionList.length}{" "}
            Questions
          </h2>
          <h2 className="flex text-sm text-gray-500 items-center gap-2">
            <CalendarCheck className="h-4 w-4" /> {today}{" "}
            <span className="text-xs">(created at)</span>
          </h2>
        </div>
      </div>

      {/* Share */}
      <div className="w-full max-w-3xl bg-white border border-gray-300 shadow-2xl rounded-2xl mt-5 p-6">
      <div className="flex items-center gap-2">
    {/* Share Text with Icon */}
    <h2 className="font-bold text-lg">Share Via</h2>
    <Share2 className="w-5 h-5 text-blue-600" />
  </div>
        <hr className="my-2" />
        <div className="flex flex-wrap justify-center mt-5 gap-4 sm:gap-7">
          <Button
            variant={"outline"}
            className="flex items-center gap-1 px-5 py-4 bg-white/10 backdrop-blur-lg border border-gray-300 rounded-xl transition-all duration-300 shadow-xl cursor-pointer hover:scale-105 hover:bg-black hover:text-white"
            onClick={() => {
              const subject = encodeURIComponent(
                "You're invited to an AI Interview"
              );
              const body = encodeURIComponent(
                `Hi there!\n\nYou’ve been invited to take an AI-powered interview in AIQuestify.\n\nHere’s your unique link: ${url}\n\nGood luck! 🚀`
              );
              const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=&su=${subject}&body=${body}`;
              window.open(gmailUrl, "_blank");
            }}
          >
            <Image
              src={"/Gmail.png"}
              width={50}
              height={50}
              className="w-8 h-8 animate-fadeIn"
              alt="icon"
            />{" "}
            <span className="font-semibold">Gmail</span>{" "}
          </Button>
          <Button
            variant={"outline"}
            className="flex items-center gap-1 px-5 py-4 bg-white/40 backdrop-blur-sm border border-gray-300 rounded-xl transition-all duration-300 shadow-xl cursor-pointer hover:scale-105 hover:bg-black hover:text-white"
            onClick={() => {
              const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                url
              )}`;
              window.open(linkedInUrl, "_blank");
            }}
          >
            <Image
              src={"/Linkedin.png"}
              width={50}
              height={50}
              className="w-7 h-7 animate-fadeIn"
              alt="icon"
            />{" "}
            <span className="font-semibold">Linkedin</span>{" "}
          </Button>
          <Button
            variant={"outline"}
            className="flex items-center gap-1 px-5 py-4 bg-white/40 backdrop-blur-sm border border-gray-300 rounded-xl transition-all duration-300 shadow-xl cursor-pointer hover:scale-105 hover:bg-black hover:text-white"
            onClick={() => {
              const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(
                url
              )}&text=You're invited to an AI Interview`;
              window.open(telegramUrl, "_blank");
            }}
          >
            <Image
              src={"/Telegram.png"}
              width={50}
              height={50}
              className="w-7 h-7 animate-fadeIn"
              alt="icon"
            />{" "}
            <span className="font-semibold">Telegram</span>{" "}
          </Button>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row w-full max-w-3xl justify-between mt-6 gap-4">
        <Link href={"/dashboard"} className="w-full sm:w-auto">
          <Button
            variant={"outline"}
            className="w-full shadow-xl cursor-pointer hover:bg-black hover:text-white animate-buttonEntrance1"
          >
            {" "}
            <Undo2 className="animate-pulse" /> Back to Dashboard{" "}
          </Button>
        </Link>
          <Button
            onClick={onReset}
            className="flex items-center justify-center gap-2 py-3 text-white
        bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700
        rounded-lg shadow-xl transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer animate-buttonEntrance1"
          >
            {" "}
            <Plus /> Create New Interview{" "}
          </Button>
      </div>
    </div>
  );
}

export default InterviewLink;
