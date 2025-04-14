import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarCheck, Clock4, Copy, CopyCheck, Linkedin, ListCollapseIcon, Mails, Plus, Send, Undo2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

function InterviewLink({ interview_id, formData }) {
    const url = process.env.NEXT_PUBLIC_HOST_URL + '/' + interview_id;

    const GetInterviewUrl = () => {
    return url;
  };
   
  const onCopyLink = async() => {
      await navigator.clipboard.writeText(url);
      toast('Link Copied')
  }

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);

    setTimeout(() => {
      setCopied(false); // Reset icon after a delay
    }, 10000);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-7">
      <Image
        src={"/Check.png"}
        alt="check"
        width={200}
        height={200}
        className="w-[80px] h-[80px] animate-bounce"
      />
      <h2 className="font-bold text-lg mt-5">
        We’ve Cooked Up Your AI Interview! It`s Ready!!
      </h2>
      <p className="mt-4">
        Share this link to candidates to initiate their AI-driven interview
      </p>

      <div className="w-full bg-white border border-gray-300 shadow-2xl p-7 mt-6 rounded-2xl">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-lg">Interview Link</h2>
          <h2 className="text-blue-600 font-semibold bg-blue-50 rounded-xl p-1 px-3">
            Valid for 30 Days
          </h2>
        </div>
        <div className="flex items-center mt-4 gap-3">
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
        <hr className="my-6" />
        <div className="flex gap-5">
          <h2 className="flex text-sm text-gray-500 items-center gap-2">
            <Clock4 className="h-4 w-4" /> {formData?.InterviewDuration}
          </h2>
          <h2 className="flex text-sm text-gray-500 items-center gap-2">
            <ListCollapseIcon className="h-4 w-4" /> {formData?.InterviewDuration}
          </h2>
          <h2 className="flex text-sm text-gray-500 items-center gap-2">
            <CalendarCheck className="h-4 w-4" /> {formData?.InterviewDuration}
          </h2>
        </div>
      </div>

      {/* Share */}
      <div className="w-full bg-white shadow-2xl rounded-2xl mt-6 p-5">
        <h2 className="font-bold">Share Via</h2>
        <div className="flex mt-5 gap-7">
          <Button variant={'outline'} className='cursor-pointer hover:scale-105'><Mails /> Email </Button>
          <Button variant={'outline'} className='cursor-pointer hover:scale-105'><Linkedin /> Linkedin </Button>
          <Button variant={'outline'} className='cursor-pointer hover:scale-105'><Send /> Telegram </Button>
        </div>
      </div>
      <div className="flex w-full justify-between mt-6 gap-5">
        <Link href={'/dashboard'}>
        <Button variant={'outline'} className='shadow-xl cursor-pointer hover:bg-black hover:text-white'> <Undo2 className="animate-pulse" /> Back to Dashboard </Button></Link>
        <Link href={'/create-interview'}>
        <Button className="flex items-center justify-center gap-2 py-3 text-white
        bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700
        rounded-lg shadow-xl transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer animate-buttonEntrance1"> <Plus /> Create New Interview </Button></Link>
      </div>
    </div>
  );
}

export default InterviewLink;
