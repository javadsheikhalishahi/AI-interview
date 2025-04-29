"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    const subject = encodeURIComponent("Support Request - Help Needed");
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nProblem Description:\n${description}`
    );
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=javadava7704.ja@gmail.com&su=${subject}&body=${body}`;
    window.open(gmailUrl, "_blank");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-blue-100 via-white to-purple-100 animate-fadeIn">
      <div className="flex flex-col md:flex-row items-center gap-12 w-full max-w-6xl">
        
        {/* Illustration */}
        <div className="flex-1 hidden md:flex justify-center animate-slideInLeft">
          <Image
            src="/support (1).svg"
            alt="Support Illustration"
            width={700}
            height={700}
            className="drop-shadow-2xl"
          />
        </div>

        {/* Contact Form */}
        <form className="flex-1 bg-white rounded-3xl shadow-2xl p-8 space-y-6 animate-slideInRight">
          <h1 className="text-3xl font-extrabold text-center text-gray-800">Need Help? Contact Us!</h1>

          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-semibold text-gray-600">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-semibold text-gray-600">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-semibold text-gray-600">
              Problem Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your issue here..."
              rows="4"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
              required
            />
          </div>

          <Button
            type="button"
            onClick={handleSubmit}
            className="w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-2xl hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer"
          >
            <Image src="/Gmail.png" width={30} height={30} alt="Gmail Icon" />
            <span className="font-semibold text-lg">Send via Gmail</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
