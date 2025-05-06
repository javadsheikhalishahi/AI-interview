"use client";
import Header from "@/app/room/_components/Header";
import { Button } from "@/components/ui/button";

import { ClipboardCopy, Info, Maximize2, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { use, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function Page({ params }) {
  const { id } = use(params); // unwrap the async `params` object
  const [shareLink, setShareLink] = useState("");
  const isJoinedRef = useRef(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink);
    toast.success("Link copied to clipboard!");
  };

  const handleFullscreen = () => {
    const elem = document.getElementById("joinMeeting");
    if (elem?.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem?.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen(); // Safari
    } else if (elem?.mozRequestFullScreen) {
      elem.mozRequestFullScreen(); // Firefox
    } else if (elem?.msRequestFullscreen) {
      elem.msRequestFullscreen(); // IE/Edge
    }
  };

  const joinMeeting = (element, zp) => {
    if (!element || isJoinedRef.current) return;
    zp.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
      sharedLinks: [],
    });
    isJoinedRef.current = true;
  };

  useEffect(() => {
    if (typeof window === "undefined" || !id) return;
  
    setShareLink(
      `${window.location.protocol}//${window.location.host}${window.location.pathname}`
    );
  
    const setupZego = async () => {
      const { ZegoUIKitPrebuilt } = await import("@zegocloud/zego-uikit-prebuilt");
  
      const appID = Number(process.env.NEXT_PUBLIC_ZEGO_APP_ID);
      const appSecret = process.env.NEXT_PUBLIC_ZEGO_APP_SECRET;
  
      if (!appID || isNaN(appID)) {
        console.error("Zego app ID is missing or invalid.");
        return;
      }
  
      if (!appSecret) {
        console.error("Zego app secret is missing.");
        return;
      }
  
      const token = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        appSecret,
        id,
        Math.random().toString(), // or use uuidv4 if needed
        "Enter your name"
      );
  
      const zp = ZegoUIKitPrebuilt.create(token);
  
      const element = document.getElementById("joinMeeting");
      if (element && !isJoinedRef.current) {
        zp.joinRoom({
          container: element,
          scenario: {
            mode: ZegoUIKitPrebuilt.VideoConference,
          },
          sharedLinks: [],
        });
        isJoinedRef.current = true;
      }
    };
  
    setupZego();
  }, [id]);
  

  return (
    <div className="flex flex-col bg-gradient-to-r from-blue-50 via-purple-100 to-pink-100">
      <Header />
    <div className="flex flex-col bg-gradient-to-r from-blue-50 via-purple-100 to-pink-100 items-center justify-start min-h-screen px-4 overflow-y-auto">
    <div className="w-full max-w-6xl mx-auto flex flex-col bg-white items-center justify-center p-8 sm:p-12 md:p-14 border rounded-2xl shadow-xl mt-4 animate-slideInRight">
    <Image
          src="/Logo1.png"
          alt="LogoInterview"
          width={120}
          height={120}
          className="w-24 sm:w-28 md:w-32 absolute top-0 left-1/2 transform -translate-x-1/2 animate-slideInRight1"
        />
      <h2 className="mt-16 text-lg sm:text-xl md:text-2xl font-bold text-center text-gray-800 animate-slideInRight2">
        Live Interview Room
      </h2>
    
      <Button
            onClick={handleFullscreen}
            className="mt-6 mb-2 flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <Maximize2 className="w-5 h-5" />
            Fullscreen
          </Button>

      {/* Video Container */}
      <div
        id="joinMeeting"
        className="w-full flex flex-col items-center justify-center sm:h-[96vh] md:h-[94vh] lg:h-[92vh] xl:h-[90vh] bg-opacity-60 rounded-lg overflow-auto sm:overflow-hidden sm:px-2 md:px-4 lg:px-8 sm:ml-0 md:ml-4 mt-6"
      />

<div className="w-full max-w-xl bg-white border border-gray-300 shadow-xl rounded-2xl mt-8 p-4 space-y-4">
  {/* Header */}
  <div className="flex items-center gap-2">
    <h2 className="font-bold text-lg">Share Via</h2>
    <Share2 className="w-5 h-5 text-blue-600" />
  </div>

  <hr className="my-2" />

  {/* Link + Copy */}
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <p className="text-sm break-all bg-gray-50 text-gray-600 border border-gray-300 px-3 py-2 rounded-lg w-full">
      {shareLink}
    </p>
    <Button
      onClick={handleCopy}
      variant="outline"
      className="flex items-center gap-2 px-5 py-3 bg-white/50 backdrop-blur-sm border border-gray-300 rounded-xl transition-all duration-300 shadow-xl cursor-pointer hover:scale-105 hover:bg-black hover:text-white"
    >
      <ClipboardCopy className="w-4 h-4" />
      <span className="font-semibold">Copy</span>
    </Button>
  </div>

  {/* Share Buttons */}
  <div className="sm:flex sm:flex-wrap grid grid-cols-2 justify-center mt-2 gap-4 sm:gap-6">
    <Button
      variant="outline"
      className="flex items-center gap-2 px-5 py-4 bg-white/10 backdrop-blur-lg border border-gray-300 rounded-xl transition-all duration-300 shadow-xl cursor-pointer hover:scale-105 hover:bg-black hover:text-white"
      onClick={() => {
        const subject = encodeURIComponent("You're invited to Live Interview");
        const body = encodeURIComponent(`Hi there!\n\nYou’ve been invited to take an Live Interview in AIQuestify.\n\nHere’s your unique link: ${shareLink}\n\nGood luck! 🚀`);
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=&su=${subject}&body=${body}`;
        window.open(gmailUrl, "_blank");
      }}
    >
      <Image src="/Gmail.png" width={50} height={50} className="w-7 h-7 animate-fadeIn" alt="Gmail" />
      <span className="font-semibold">Gmail</span>
    </Button>

    <Button
      variant="outline"
      className="flex items-center gap-2 px-5 py-4 bg-white/40 backdrop-blur-sm border border-gray-300 rounded-xl transition-all duration-300 shadow-xl cursor-pointer hover:scale-105 hover:bg-black hover:text-white"
      onClick={() => {
        const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareLink)}`;
        window.open(linkedInUrl, "_blank");
      }}
    >
      <Image src="/Linkedin.png" width={50} height={50} className="w-6 h-6 animate-fadeIn" alt="LinkedIn" />
      <span className="font-semibold">LinkedIn</span>
    </Button>

    <Button
      variant="outline"
      className="flex items-center gap-2 px-5 py-4 bg-white/40 backdrop-blur-sm border border-gray-300 rounded-xl transition-all duration-300 shadow-xl cursor-pointer hover:scale-105 hover:bg-black hover:text-white"
      onClick={() => {
        const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(shareLink)}&text=You're invited to a Live Interview in AIQuestify`;
        window.open(telegramUrl, "_blank");
      }}
    >
      <Image src="/Telegram.png" width={50} height={50} className="w-6 h-6 animate-fadeIn" alt="Telegram" />
      <span className="font-semibold">Telegram</span>
    </Button>
  </div>
</div>



      {/* Info Box */}
      <div className="flex flex-col bg-blue-50 gap-4 p-4 rounded-lg shadow-lg w-full max-w-xl mt-8">
        <h3 className="text-base sm:text-lg font-semibold text-blue-700 flex items-center justify-center gap-2">
          <Info className="w-4 h-4 text-blue-600" />
          Things to Know Before You Begin
        </h3>
        <ul className="list-disc list-inside text-sm text-blue-600 text-center">
          <li>Ensure your camera and microphone are working</li>
          <li>Use a reliable internet connection</li>
          <li>Find a calm, quiet place for a professional vibe</li>
        </ul>
      </div>

    </div>
    </div>
    <div className="w-full text-center text-sm text-gray-500 mt-14 pb-8">
        © 2025{" "}
        <Link
          href="https://www.linkedin.com/in/javad-sheikhalishahi-60094629b/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 font-semibold hover:text-indigo-600 transition-all duration-200 underline underline-offset-4 decoration-blue-300 hover:decoration-indigo-400"
        >
          Javad.Inc
        </Link>{" "}
        · All rights reserved.
      </div>
    </div>
  );
}
