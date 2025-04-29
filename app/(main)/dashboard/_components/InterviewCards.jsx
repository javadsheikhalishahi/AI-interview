import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight, Clock10, Copy, CopyCheck, Share, Share2, User2 } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const avatarOptions = [
    "/select/Google-logo.svg",
    "/select/icons8-amazon.svg",
    "/select/icons8-apple.svg",
    "/select/icons8-chatgpt.svg",
    "/select/icons8-deepseek.svg",
    "/select/icons8-ibm.svg",
    "/select/icons8-samsung.svg",
    "/select/icons8-tesla.svg",
    "/select/icons8-microsoft.svg",
    "/select/icons8-uber.svg",
    "/select/icons8-x.svg",
    "/select/icons8-facebook.svg",
  ];

function InterviewCards({ interview, viewDetail=false, showCandidates = true}) {
    const [copied, setCopied] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedAvatar, setSelectedAvatar] = useState(() => {
        // Use interview ID to store the avatar in localStorage
        if (typeof window !== "undefined") {
            return localStorage.getItem(`selectedAvatar-${interview?.interview_id}`) || avatarOptions[0];
        }
        return avatarOptions[0];
    });
    const triggerRef = useRef(null);

    const url = process.env.NEXT_PUBLIC_HOST_URL + "/" + interview?.interview_id;

    const onCopyLink = () => {
        navigator.clipboard.writeText(url);
        toast.success("Link Copied");
        handleCopy(url);
      }

      const handleCopy = (url) => {
        navigator.clipboard.writeText(url);
        setCopied(true);
    
        setTimeout(() => {
          setCopied(false);
        }, 10000);
      };
      const openModal = () => {
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
      };

      useEffect(() => {
        if (selectedAvatar && interview?.interview_id) {
            // Save the selected avatar for the current interview in localStorage
            localStorage.setItem(`selectedAvatar-${interview?.interview_id}`, selectedAvatar);
        }
    }, [selectedAvatar, interview?.interview_id]);

  return (
    <div className=" bg-white rounded-xl p-5 border mt-6 animate-slideInRight shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl">
      <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
                    {/* Avatar Image that opens the dropdown */}
                    <Image
                        src={selectedAvatar}
                        alt="Selected Avatar"
                        width={40}
                        height={40}
                        className="rounded-full border-2 border-blue-400 shadow-md cursor-pointer hover:scale-105 transition duration-300"
                        onClick={() => {
                            if (triggerRef.current) {
                                triggerRef.current.click();
                            }
                        }}
                    />

                    {/* Hidden clickable trigger */}
                    <Select value={selectedAvatar} onValueChange={setSelectedAvatar}>
                        <SelectTrigger ref={triggerRef} className="w-[1px] h-[1px] p-0 m-0 opacity-0 absolute">
                            <SelectValue placeholder="Select Avatar" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl bg-white shadow-lg border border-gray-300">
                            {avatarOptions.map((avatar, i) => (
                                <SelectItem key={i} value={avatar}>
                                    <div className="flex items-center gap-2">
                                        <Image
                                            src={avatar}
                                            alt={`Avatar ${i + 1}`}
                                            width={24}
                                            height={24}
                                            className="rounded-full"
                                        />
                                        <span className="text-sm"></span>
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
        <h2 className="text-sm font-semibold">{moment(interview?.created_at).format('DD MMM yyy')}</h2>
      </div>
      <h2 className="text-lg font-bold mt-3 text-gray-900 animate-slideInRight1">{interview?.JobPosition}</h2>
      <div className="flex flex-col items-start text-sm text-gray-600 mt-3 gap-2">
  <div className="flex items-center gap-1 animate-slideInRight2">
    <Clock10 className="w-4 h-4 text-yellow-400" />
    <span>{interview?.InterviewDuration}</span>
  </div>

  {showCandidates && (
    <div className="flex items-center gap-1 animate-slideInRight3">
      <User2 className="w-4 h-4 text-purple-600" />
      <span className="text-emerald-600 font-semibold">
        {interview['interview-feedback']?.length} Candidates
      </span>
    </div>
  )}
</div>



     {!viewDetail ? <div className="flex gap-4 mt-4">
      <Button
            onClick={() => {
              onCopyLink();
            
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
          <Button className='cursor-pointer hover:scale-105 animate-buttonEntrance1' onClick={openModal}><Share /> Send</Button>
      </div>
      :
      <Link href={'/scheduled-interview/'+ interview?.interview_id+'/details'}>
     <Button className='flex w-full items-center justify-center gap-2 py-3 text-black
        glassmorphism-2
        rounded-lg shadow-xl transition duration-300 ease-in-out transform hover:scale-105 mt-4 cursor-pointer animate-slideInRight4'>View Details <ArrowRight /></Button></Link>
    } 


       {/* Modal */}
       {isModalOpen && (
        <div className="fixed inset-0 bottom-20 flex items-center justify-center z-50 ">
          <div className="flex flex-col rounded-xl p-6 max-w-sm w-full glassmorphism-1 border border-gray-400 shadow-2xl">
          <h3 className="text-lg text-center font-bold mb-6 flex items-center justify-center gap-2">
  Share via<Share2 className="w-5 h-5 text-blue-600 animate-bounce" />
  
</h3>


            <Button
              variant={"outline"}
              className="flex items-center gap-1 px-5 py-4 bg-white/10 backdrop-blur-lg border border-gray-300 rounded-xl transition-all duration-300 shadow-xl cursor-pointer hover:scale-105 hover:bg-black hover:text-white"
              onClick={() => {
                const subject = encodeURIComponent("You're invited to an AI Interview");
                const body = encodeURIComponent(
                  `Hi there!\n\nYou’ve been invited to take an AI-powered interview in AIQuestify.\n\nHere’s your unique link: ${url}\n\nGood luck! 🚀`
                );
                const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=&su=${subject}&body=${body}`;
                window.open(gmailUrl, "_blank");
                closeModal(); // Close modal after action
              }}
            >
              <Image src={"/Gmail.png"} width={50} height={50} className="w-8 h-8 animate-fadeIn" alt="icon" />
              <span className="font-semibold">Gmail</span>
            </Button>

            <Button
              variant={"outline"}
              className="flex items-center gap-1 px-5 py-4 bg-white/40 backdrop-blur-sm border border-gray-300 rounded-xl transition-all duration-300 shadow-xl cursor-pointer hover:scale-105 hover:bg-black hover:text-white mt-3"
              onClick={() => {
                const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
                window.open(linkedInUrl, "_blank");
                closeModal();
              }}
            >
              <Image src={"/Linkedin.png"} width={50} height={50} className="w-7 h-7 animate-fadeIn" alt="icon" />
              <span className="font-semibold">Linkedin</span>
            </Button>

            <Button
              variant={"outline"}
              className="flex items-center gap-1 px-5 py-4 bg-white/40 backdrop-blur-sm border border-gray-300 rounded-xl transition-all duration-300 shadow-xl cursor-pointer hover:scale-105 hover:bg-black hover:text-white mt-3"
              onClick={() => {
                const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=You're invited to an AI Interview`;
                window.open(telegramUrl, "_blank");
                closeModal();
              }}
            >
              <Image src={"/Telegram.png"} width={50} height={50} className="w-7 h-7 animate-fadeIn" alt="icon" />
              <span className="font-semibold">Telegram</span>
            </Button>

            <Button
              variant={"outline"}
              className="mt-4 w-full text-center font-bold rounded-lg bg-rose-500 text-white cursor-pointer hover:bg-rose-600 hover:scale-105"
              onClick={closeModal}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default InterviewCards;
