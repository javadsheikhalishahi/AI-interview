"use client"; 

import AnimatedLines from '@/app/component/AnimatedLines.jsx';
import { supabase } from '@/services/supabaseClient';

import { ArrowRight, Bot, Brain, CalendarDays, CheckCircle, ChevronDown, Clock, Flag, Github, LayoutDashboard, Linkedin, ListChecks, Mail, Menu, MessageSquare, PartyPopper, Play, Plus, Send, Share2, Star, TrendingUp, Trophy, Twitter, Users, X, Zap } from 'lucide-react'; // Added new icons
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

const Counter = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    class SineWaveGenerator {
      constructor(options) {
        if (!options.el) throw new Error("No Canvas Selected");

        this.el = options.el;
        this.ctx = this.el.getContext("2d");
        this.dpr = window.devicePixelRatio || 1;
        this.resizeCanvas();

        this.speed = 10;
        this.amplitude = 50;
        this.wavelength = 50;
        this.segmentLength = 10;
        this.lineWidth = 2;
        this.strokeStyle = "rgba(16, 16, 16, 0.2)";
        this.time = 0;
        this.waves = options.waves || [];

        if (this.waves.length === 0) throw new Error("No waves specified");

        window.addEventListener("resize", this.resizeCanvas.bind(this));
        this.loop();
      }

      resizeCanvas() {
        const parent = this.el.parentElement;
        const width = parent.offsetWidth;
        const height = parent.offsetHeight;

        this.width = this.el.width = width * this.dpr;
        this.height = this.el.height = height * this.dpr;
        this.el.style.width = width + "px";
        this.el.style.height = height + "px";

        this.waveWidth = this.width * 0.95;
        this.waveLeft = this.width * 0.025;
      }

      clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
      }

      update(time) {
        this.time = this.time - 0.007;
        if (typeof time === "undefined") time = this.time;

        this.waves.forEach((wave) => {
          let timeModifier = wave.timeModifier || 1;
          this.drawSine(time * timeModifier, wave);
        });
      }

      ease(percent, amplitude) {
        return amplitude * (Math.sin(percent * Math.PI * 2 - Math.PI / 2) + 1) * 0.5;
      }

      drawSine(time, options = {}) {
        const amplitude = options.amplitude || this.amplitude;
        const wavelength = options.wavelength || this.wavelength;
        const lineWidth = options.lineWidth || this.lineWidth;
        const strokeStyle = options.strokeStyle || this.strokeStyle;
        const segmentLength = options.segmentLength || this.segmentLength;

        let x = time;
        let y = 0;

        const yAxis = this.height / 2;
        this.ctx.lineWidth = lineWidth * this.dpr;
        this.ctx.strokeStyle = strokeStyle;
        this.ctx.beginPath();

        this.ctx.moveTo(0, yAxis);
        this.ctx.lineTo(this.waveLeft, yAxis);

        for (let i = 0; i < this.waveWidth; i += segmentLength) {
          x = (time * this.speed) + (-yAxis + i) / wavelength;
          y = Math.sin(x);
          let amp = this.ease(i / this.waveWidth, amplitude);
          this.ctx.lineTo(i + this.waveLeft, amp * y + yAxis);
        }

        this.ctx.lineTo(this.width, yAxis);
        this.ctx.stroke();
      }

      loop() {
        this.clear();
        this.update();
        requestAnimationFrame(this.loop.bind(this));
      }
    }

    new SineWaveGenerator({
      el: document.getElementById("waves"),
      waves: [
        { timeModifier: 1, lineWidth: 3, amplitude: 150, wavelength: 200, segmentLength: 20 },
        { timeModifier: 1, lineWidth: 2, amplitude: 150, wavelength: 100 },
        { timeModifier: 1, lineWidth: 1, amplitude: -150, wavelength: 50, segmentLength: 10 },
        { timeModifier: 1, lineWidth: 0.5, amplitude: -100, wavelength: 100, segmentLength: 10 },
      ],
    });
  }, []);



  useEffect(() => {
    if (inView) {
      let start = 0;
      const increment = end / (duration / 50);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          start = end;
          clearInterval(timer);
        }
        setCount(Math.ceil(start));
      }, 50);

      return () => clearInterval(timer); 
    }
  }, [end, duration, inView]); 

  
  return <span ref={ref}>{count.toLocaleString()}</span>;
};


// for FAQ
const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-700 py-4 w-full cursor-pointer">
      <button
        className="flex justify-between items-center w-full text-left text-lg font-semibold text-gray-800 focus:outline-none cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <ChevronDown className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`} size={20} />
      </button>
      {isOpen && (
        <div className="mt-4 text-gray-400 animate-fadeIn">
          {children}
        </div>
      )}
    </div>
  );
};


export default function AiInterviewLandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const { ref: refStep1, inView: inViewStep1 } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: refStep2, inView: inViewStep2 } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: refStep3, inView: inViewStep3 } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: refStep4, inView: inViewStep4 } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: refStep5, inView: inViewStep5 } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: refStep6, inView: inViewStep6 } = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    // Fetch session on mount
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };

    fetchSession();

    // Set up auth listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    // Cleanup function
    return () => {
      authListener?.subscription?.unsubscribe?.();
    };
  }, []);

  const handleDashboardClick = () => {
    if (user) {
      window.location.href = "/dashboard";
    } else {
      window.location.href = "/auth";
    }
  };

  const supabaseGoogleSignInUrl = process.env.NEXT_PUBLIC_SUPABASE_GOOGLE_SIGN_IN_URL || '/auth/google';

  return (
    <div className="min-h-screen bg-gradient-to-br from-black/5 via-sky-100 to-purple-100 text-gray-300 font-sans relative">
      <AnimatedLines />
      <Head>
         <link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      <div className="absolute inset-0 w-full h-full z-0 opacity-70 pointer-events-none">
        <div className="absolute inset-0 radial-gradient-trading opacity-50"></div>
        <div className="absolute inset-0 w-full h-full pattern-grid-subtle opacity-10"></div> 

        <div className="absolute top-[5%] left-[15%] w-80 h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full mix-blend-screen filter blur-3xl opacity-60 animate-blob"></div> 
        <div className="absolute top-[25%] right-[5%] w-80 h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-fuchsia-500 to-pink-600 rounded-full mix-blend-screen filter blur-3xl opacity-60 animate-blob animation-delay-1000"></div> 
        <div className="absolute bottom-[10%] left-[10%] w-80 h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mix-blend-screen filter blur-3xl opacity-60 animate-blob animation-delay-2000"></div> 
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 w-full px-6 md:px-12 lg:px-24 py-4 md:py-5 flex justify-between items-center backdrop-filter backdrop-blur-xl glassmorphism-3 bg-opacity-70 border-b border-gray-800 transition-shadow duration-300 overflow-hidden"> 
        <div className="flex items-center space-x-2 text-2xl font-extrabold text-cyan-400 animate-fadeIn gap-1">
        <Image src="/Logo1.png" alt="AIQuestify Logo" width={40} height={40} priority className="rounded-full opacity-90 scale-150" />
          <span>AIQuestify</span>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <Link href="#features" className="text-gray-800 hover:text-cyan-400 transition duration-300 relative group font-medium">
            Features
             <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="#how-it-works" className="text-gray-800 hover:text-cyan-400 transition duration-300 relative group font-medium">
            How it Works
             <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="#pricing" className="text-gray-800 hover:text-cyan-400 transition duration-300 relative group font-medium">
            Pricing
             <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </nav>
        <div className="hidden md:flex items-center space-x-4">
          {/* Dashboard Button linking to Supabase Google Sign-In */}
          
             <Button onClick={handleDashboardClick} className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white rounded-full px-6 py-2 shadow-lg transition duration-300 flex items-center gap-2 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 font-semibold cursor-pointer">
                <LayoutDashboard size={20} /> Dashboard
             </Button>
          
          <Link href="/auth">
            <Button className="bg-gradient-to-r from-fuchsia-500 to-pink-600 hover:from-fuchsia-600 hover:to-pink-700 text-white rounded-full px-6 py-2 shadow-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:ring-opacity-50 font-semibold cursor-pointer">
              Try Free
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-300 focus:outline-none">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed  inset-x-0 top-16 bottom-0 glassmorphism-1 bg-opacity-95 z-40 flex flex-col items-center space-y-6 py-8 transition-transform duration-300 ease-in-out transform origin-top animate-fadeIn overflow-hidden"> 
           {/* Close button for mobile menu */}
           <button onClick={() => setIsMenuOpen(false)} className="absolute top-4 right-6 text-gray-300 focus:outline-none">
              <X size={24} />
           </button>
          <Link href="#features" onClick={() => setIsMenuOpen(false)} className="block text-gray-800 text-lg hover:text-cyan-400 items-center transition duration-300 font-medium">Features</Link> 
          <Link href="#how-it-works" onClick={() => setIsMenuOpen(false)} className="block text-gray-800 text-lg hover:text-cyan-400 items-center transition duration-300 font-medium">How it Works</Link>
          <Link href="#pricing" onClick={() => setIsMenuOpen(false)} className="block text-gray-800 text-lg hover:text-cyan-400 items-center transition duration-300 font-medium">Pricing</Link>
           {/* Dashboard Button in Mobile Menu */}
           
             <Button onClick={handleDashboardClick} className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white rounded-full px-6 py-3 shadow-md transition duration-300 w-4/5 text-center flex items-center justify-center gap-2 text-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 font-semibold ml-6">
                <LayoutDashboard size={20} /> Dashboard
             </Button>
           <Link href="/auth" >
            <Button className="bg-gradient-to-r from-fuchsia-500 to-pink-600 hover:from-fuchsia-600 hover:to-pink-700 text-white rounded-full px-6 py-3 shadow-md transition duration-300 w-4/5 text-center text-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:ring-opacity-50 font-semibold">
             Try Free
           </Button>
          </Link>
        </div>
      )}

      {/* Hero Section */}
      <>
      <div className="relative w-full h-screen overflow-hidden -top-20">
        <canvas id="waves" className="hidden md:block absolute inset-0 z-0 pointer-events-none" />
        <section className="relative z-10 container mx-auto px-6 py-24 md:py-32 lg:py-40 text-center md:text-left grid grid-cols-1 md:grid-cols-2 gap-12 items-center min-h-screen">
          <div className="flex flex-col items-center md:items-start animate-slideInRight1 ">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 text-black animate-fadeInUp">
              Revolutionize{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Your Hiring
              </span>{" "}
              with AI
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 mb-10 max-w-3xl mx-auto md:mx-0 animate-fadeInUp animation-delay-300 font-medium">
              Conduct efficient, unbiased, and insightful interviews anytime, anywhere with our intelligent AI interviewer.
            </p>
            <div className="flex justify-center md:justify-start space-x-4 animate-fadeInUp animation-delay-600">
              <Button onClick={handleDashboardClick} className="bg-gradient-to-r from-fuchsia-500 to-pink-600 text-white rounded-full px-8 py-3 text-lg shadow-lg transition duration-300 flex items-center transform hover:scale-105 font-semibold cursor-pointer">
                Try Free Demo <ArrowRight className="ml-2" size={20} />
              </Button>
              <Link href='Learn'>
              <Button
                variant="outline"
                className="border-2 border-cyan-500 text-gray-900 hover:bg-cyan-500 hover:text-white rounded-full px-8 py-3 text-lg transition duration-300 transform hover:scale-105 font-semibold cursor-pointer"
              >
                Learn More
              </Button></Link>
            </div>
          </div>

          <div className="mt-16 md:mt-0 flex justify-center md:justify-end animate-fadeInUp animation-delay-900">
            <div className="relative w-full flex items-center justify-center text-gray-600 text-xl p-4">
              <div className="absolute inset-0 pattern-grid-subtle opacity-20" />
              <div className="absolute inset-0 radial-gradient-trading opacity-30" />
              <div className="relative -z-10 w-full h-full rounded-lg flex items-center justify-center animate-slideInRight">
                <Image
                  src="/innovation-concept-illustration.png"
                  alt="Ai interview"
                  width={400}
                  height={400}
                  className="md:scale-150 lg:scale-125 xl:scale-150 sm:scale-100"
                  priority
                />
              </div>
              <div className="absolute inset-[-5px] rounded-xl border-2 border-transparent animate-pulse-border" />
            </div>
          </div>
        </section>
      </div>
    
      {/* Stats Section */}
      <section className="relative z-10 container mx-auto px-6 py-16 md:py-7 text-center -top-36">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-black animate-fadeInUp">Our Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="bg-gray-900 bg-opacity-50 p-8 rounded-xl shadow-xl border border-gray-800 flex flex-col items-center animate-slideInLeft transform hover:scale-105 transition-transform duration-300">
            <div className="text-5xl font-extrabold bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-transparent bg-clip-text mb-3 bounce-in ">
              <Counter end={50000} />+
            </div>
            <p className="text-gray-400 text-lg font-medium">Interviews Conducted</p>
          </div>
          <div className="bg-gray-900 bg-opacity-50 p-8 rounded-xl shadow-xl border border-gray-800 flex flex-col items-center animate-fadeInUp animation-delay-300 transform hover:scale-105 transition-transform duration-300">
            <div className="text-5xl font-extrabold mb-3 bounce-in fill-gradient">
              <Counter end={100000} />+
            </div>
            <p className="text-gray-400 text-lg font-medium">Candidates Rated</p>
          </div>
          <div className="bg-gray-900 bg-opacity-50 p-8 rounded-xl shadow-xl border border-gray-800 flex flex-col items-center animate-slideInRight animation-delay-600 transform hover:scale-105 transition-transform duration-300">
            <div className="text-5xl font-extrabold text-pink-400 mb-3 bounce-in">
              <Counter end={5000} />+
            </div>
            <p className="text-gray-400 text-lg font-medium">Hours Saved Weekly</p>
          </div>
        </div>
      </section>
    </>

       <section ref={refStep3} className={`relative z-10 container mx-auto px-6 py-20 md:py-24 lg:py-32 ${inViewStep3 ? 'animate-fadeUp' : 'opacity-0'}`}>
           <h2  className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900 animate-fadeIn">
               Unlock the Future of Hiring
           </h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
               {/* Benefit Card 1: Speed */}
               <div className="bg-white bg-opacity-80 p-8 rounded-xl shadow-xl hover:shadow-2xl border border-gray-200 flex flex-col items-center text-center animate-slideInLeft transform hover:scale-105 transition-transform duration-300">
                   <div className="p-4 bg-blue-600 rounded-full inline-block mb-6 shadow-md animate-wiggle">
                       <Zap size={36} className="text-white" />
                   </div>
                   <h3 className="text-xl font-semibold mb-4 text-gray-900">Accelerate Screening</h3>
                   <p className="text-gray-700 font-medium">
                       Rapidly evaluate candidates and identify top talent faster than ever before.
                   </p>
               </div>

               {/* Benefit Card 2: Efficiency */}
               <div className="bg-white bg-opacity-80 p-8 rounded-xl shadow-xl hover:shadow-2xl border border-gray-200 flex flex-col items-center text-center animate-fadeIn animation-delay-300 transform hover:scale-105 transition-transform duration-300">
                   <div className="p-4 bg-green-600 rounded-full inline-block mb-6 shadow-md animate-wiggle">
                       <Clock size={36} className="text-white" />
                   </div>
                   <h3 className="text-xl font-semibold mb-4 text-gray-900">Boost Efficiency</h3>
                   <p className="text-gray-700 font-medium">
                       Automate repetitive tasks and free up your team for strategic work.
                   </p>
               </div>

               {/* Benefit Card 3: Quality */}
               <div className="bg-white bg-opacity-80 p-8 rounded-xl shadow-xl hover:shadow-2xl border border-gray-200 flex flex-col items-center text-center animate-slideInRight animation-delay-600 transform hover:scale-105 transition-transform duration-300">
                   <div className="p-4 bg-purple-600 rounded-full inline-block mb-6 shadow-md animate-wiggle">
                       <TrendingUp size={36} className="text-white" />
                   </div>
                   <h3 className="text-xl font-semibold mb-4 text-gray-900">Improve Quality</h3>
                   <p className="text-gray-700 font-medium">
                       Gain deeper insights and make data-driven hiring decisions.
                   </p>
               </div>
           </div>
       </section>


      {/* Features Section */}
      <section id="features" ref={refStep2} className={`relative z-10 container mx-auto px-6 py-20 md:py-24 lg:py-32 ${inViewStep2 ? 'animate-fadeUp' : 'opacity-0'}` }>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900 animate-fadeInUp"> 
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Feature Card 1: Intelligent Questioning */}
          <div className="bg-gray-900 bg-opacity-50 p-8 cursor-pointer rounded-xl shadow-xl hover:shadow-2xl hover:border-blue-500 text-center border-2 border-gray-800 animate-slideInLeft transform hover:scale-105 transition-transform duration-300 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-900 to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
            <div className="flex justify-center mb-6 relative z-10"> 
              <div className="p-4 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full inline-block shadow-lg">
                 <Brain size={36} className="text-white animate-wiggle" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-white relative z-10">Intelligent Questioning</h3> 
            <p className="text-gray-400 relative z-10 font-medium"> 
              Our AI adapts questions based on candidate responses for deeper insights.
            </p>
          </div>

          {/* Feature Card 2: Natural Conversation */}
          <div className="bg-gray-900 bg-opacity-50 p-8 cursor-pointer rounded-xl shadow-xl hover:shadow-2xl hover:border-fuchsia-500 text-center border-2 border-gray-800 animate-fadeInUp animation-delay-300 transform hover:scale-105 transition-transform duration-300 relative overflow-hidden group">
             <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-900 to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
            <div className="flex justify-center mb-6 relative z-10"> 
              <div className="p-4 bg-gradient-to-br from-fuchsia-500 to-pink-600 rounded-full inline-block shadow-lg"> 
                 <Bot size={36} className="text-white animate-wiggle" /> 
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-white relative z-10">Natural Conversation</h3> 
            <p className="text-gray-400 relative z-10 font-medium"> 
              Candidates interact with the AI interviewer in a fluid, natural dialogue.
            </p>
          </div>

          {/* Feature Card 3: Automated Rating */}
          <div className="bg-gray-900 bg-opacity-50 p-8 cursor-pointer rounded-xl shadow-lg hover:shadow-2xl hover:border-yellow-500 text-center border-2 border-gray-800 animate-slideInRight animation-delay-600 transform hover:scale-105 transition-transform duration-300 relative overflow-hidden group"> 
             <div className="absolute inset-0 bg-gradient-to-br from-yellow-900 to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
            <div className="flex justify-center mb-6 relative z-10"> 
              <div className="p-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full inline-block shadow-lg"> 
                 <Trophy size={36} className="text-white animate-wiggle" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-white relative z-10">Automated Rating</h3> 
            <p className="text-gray-400 relative z-10 font-medium">
              Receive instant, objective ratings based on performance and responses.
            </p>
          </div>

           {/* Feature Card 4: Actionable Recommendations */}
          <div className="bg-gray-900 bg-opacity-50 p-8 cursor-pointer rounded-xl shadow-lg hover:shadow-2xl hover:border-green-500 text-center border-2 border-gray-800 animate-slideInLeft animation-delay-900 transform hover:scale-105 transition-transform duration-300 relative overflow-hidden group">
             <div className="absolute inset-0 bg-gradient-to-br from-green-900 to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
            <div className="flex justify-center mb-6 relative z-10">
              <div className="p-4 bg-gradient-to-br from-green-500 to-teal-600 rounded-full inline-block shadow-lg">
                 <ListChecks size={36} className="text-white animate-wiggle" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-white relative z-10">Actionable Recommendations</h3>
            <p className="text-gray-400 relative z-10 font-medium">
              Get tailored suggestions for next steps and areas for candidate development.
            </p>
          </div>

           {/* Feature Card 5: Easy Link Sharing */}
          <div className="bg-gray-900 bg-opacity-50 p-8 cursor-pointer rounded-xl shadow-lg hover:shadow-2xl hover:border-orange-500 text-center border-2 border-gray-800 animate-fadeInUp animation-delay-1200 transform hover:scale-105 transition-transform duration-300 relative overflow-hidden group"> 
             <div className="absolute inset-0 bg-gradient-to-br from-orange-900 to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
            <div className="flex justify-center mb-6 relative z-10">
              <div className="p-4 bg-gradient-to-br from-orange-500 to-red-600 rounded-full inline-block shadow-lg">
                 <Share2 size={36} className="text-white animate-wiggle" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-white relative z-10">Easy Link Sharing</h3>
            <p className="text-gray-400 relative z-10 font-medium">
              Send unique interview links to candidates with a single click.
            </p>
          </div>

           {/* Feature Card 6: Seamless Live Scheduling */}
          <div className="bg-gray-900 bg-opacity-50 p-8 cursor-pointer rounded-xl shadow-lg hover:shadow-2xl hover:border-rose-500 text-center border-2 border-gray-800 animate-slideInRight animation-delay-1500 transform hover:scale-105 transition-transform duration-300 relative overflow-hidden group"> 
             <div className="absolute inset-0 bg-gradient-to-br from-rose-900 to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
            <div className="flex justify-center mb-6 relative z-10">
              <div className="p-4 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full inline-block shadow-lg"> 
                 <CalendarDays size={36} className="text-white animate-wiggle" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-white relative z-10">Seamless Live Scheduling</h3>
            <p className="text-gray-400 relative z-10 font-medium">
              Integrate live interview scheduling directly into your workflow.
            </p>
          </div>

        </div>
      </section>

{/*How AIQuestify Works*/}
      <section id="how-it-works" ref={refStep1} className={`relative z-10 container mx-auto px-6 py-20 md:py-24 lg:py-32 text-center ${inViewStep1 ? 'animate-slideInRight' : 'opacity-0'} `}>
  <h2 className="text-3xl md:text-4xl font-bold mb-16 text-gray-900 animate-fadeInUp">
    How AIQuestify Works
  </h2>
  <div className="relative flex flex-col items-center space-y-10">
    <div className="absolute inset-0 w-1 bg-yellow-400 left-1/2 transform -translate-x-1/2"></div>

    {/* Step 1 */}
    <div className="relative flex w-full max-w-5xl items-center justify-center md:justify-between gap-2 animate-wiggle1"> 
      <div className="w-full md:w-5/12 flex-grow "></div>
      <div className="absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 z-10 ">
        <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full shadow-xl flex items-center justify-center ">
          <span className="text-white text-2xl font-bold">1</span>
        </div>
      </div>
      <div className="w-full md:w-5/12 flex-grow bg-gray-900 bg-opacity-50 p-8 rounded-xl shadow-2xl border-gray-800 animate-slideInLeft transform border-4 hover:border-purple-600 transition-transform duration-300 cursor-pointer">
        <div className="text-center md:text-left">
          <h3 className="text-xl font-semibold mb-3 text-white flex items-center gap-2">
            <Plus className='text-purple-600 w-7 h-7'/>
            Create Your Interview
          </h3>
          <p className="text-gray-400 font-medium">Define the role, skills, and customize questions or let AI suggest them.</p>
        </div>
      </div>
    </div>
    
    {/* Step 2 */}
    <div className="relative flex w-full max-w-5xl items-center justify-center md:justify-between gap-2 animate-wiggle1">
      <div className="w-full md:w-5/12 flex-grow bg-gray-900 bg-opacity-50 p-8 rounded-xl shadow-2xl border-4 border-gray-800 animate-slideInRight animation-delay-300 transform hover:border-orange-600 transition-transform duration-300">
        <div className="text-center md:text-right">
          <h3 className="text-xl font-semibold mb-3 text-white flex items-center justify-end gap-2">
            Send Candidate Links
            <Send className='text-orange-600' />
          </h3>
          <p className="text-gray-400 font-medium">Generate and share unique links for candidates to take the AI interview anytime.</p>
        </div>
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 z-10">
        <div className="w-14 h-14 bg-gradient-to-br from-pink-600 to-orange-600 rounded-full shadow-lg flex items-center justify-center">
          <span className="text-white text-2xl font-bold">2</span>
        </div>
      </div>
      <div className="w-full md:w-5/12 flex-grow"></div>
    </div>

    {/* Step 3 */}
    <div className="relative flex w-full max-w-5xl items-center justify-center md:justify-between gap-2 animate-wiggle1">
      <div className="w-full md:w-5/12 flex-grow"></div>
      <div className="absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 z-10">
        <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full shadow-xl flex items-center justify-center">
          <span className="text-white text-2xl font-bold">3</span>
        </div>
      </div>
      <div className="w-full md:w-5/12 flex-grow bg-gray-900 bg-opacity-50 p-8 rounded-xl shadow-2xl border-4 border-gray-800 animate-slideInLeft animation-delay-600 transform hover:border-blue-600 transition-transform duration-300">
        <div className="text-center md:text-left">
          <h3 className="text-xl font-semibold mb-3 text-white flex items-center gap-2">
            <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M9 17v-6a3 3 0 016 0v6"></path><path d="M4 21v-2a4 4 0 014-4h8a4 4 0 014 4v2"></path>
            </svg>
            AI Conducts Interview & Rates
          </h3>
          <p className="text-gray-400 font-medium">Our AI talks to candidates, asks questions, and provides an automatic rating and feedback.</p>
        </div>
      </div>
    </div>

    {/* Step 4 */}
    <div className="relative flex w-full max-w-5xl items-center justify-center md:justify-between gap-2 animate-wiggle1">
      <div className="w-full md:w-5/12 flex-grow bg-gray-900 bg-opacity-50 p-8 rounded-xl shadow-2xl border-4 border-gray-800 animate-slideInRight animation-delay-900 transform hover:border-green-600 transition-transform duration-300">
        <div className="text-center md:text-right">
          <h3 className="text-xl font-semibold mb-3 text-white flex items-center justify-end gap-2">
            Review Results & Recommendations
            <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M5 13l4 4L19 7" />
            </svg>
          </h3>
          <p className="text-gray-400 font-medium">Access detailed reports, candidate ratings, and AI-driven recommendations.</p>
        </div>
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 z-10">
        <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-teal-600 rounded-full shadow-lg flex items-center justify-center">
          <span className="text-white text-2xl font-bold">4</span>
        </div>
      </div>
      <div className="w-full md:w-5/12 flex-grow"></div>
    </div>

    {/* Step 5 */}
    <div className="relative flex w-full max-w-5xl items-center justify-center md:justify-between gap-2 animate-wiggle1">
      <div className="w-full md:w-5/12 flex-grow"></div>
      <div className="absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 z-10">
        <div className="w-14 h-14 bg-gradient-to-br from-orange-600 to-red-600 rounded-full shadow-xl flex items-center justify-center">
          <span className="text-white text-2xl font-bold">5</span>
        </div>
      </div>
      <div className="w-full md:w-5/12 flex-grow bg-gray-900 bg-opacity-50 p-8 rounded-xl shadow-2xl border-4 border-gray-800 animate-slideInLeft animation-delay-1200 transform hover:border-red-500 transition-transform duration-300">
        <div className="text-center md:text-left">
          <h3 className="text-xl font-semibold mb-3 text-white flex items-center gap-2">
            <Play className='text-red-600' />
            Schedule Live Interviews (Optional)
          </h3>
          <p className="text-gray-400 font-medium">Easily schedule follow-up live interviews with promising candidates.</p>
        </div>
      </div>
    </div>
     {/* Finish Step */}
     <div className="relative flex w-full max-w-5xl items-center justify-center md:justify-between gap-2 animate-wiggle1">
      <div className="w-full md:w-5/12 flex-grow bg-gray-900 bg-opacity-50 p-8 rounded-xl shadow-2xl border-4 border-gray-800 animate-slideInRight animation-delay-[1500ms] transform hover:border-yellow-500 transition-transform duration-300">
        <div className="text-center md:text-right">
          <h3 className="text-xl font-semibold mb-3 text-white flex items-center justify-end gap-2">
            All Done!
            <Flag className="w-7 h-7 text-yellow-400" />
          </h3>
          <p className="text-gray-400 font-medium">
            Sit back, relax, and let AIQuestify help you discover top talent effortlessly.
          </p>
        </div>
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 z-10">
        <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-full shadow-lg flex items-center justify-center">
          <span className="text-white text-2xl font-bold"><PartyPopper className='w-8 h-8 text-black animate-wiggle'/></span>
        </div>
      </div>
      <div className="w-full md:w-5/12 flex-grow"></div>
    </div>

    {/* Final Quote */}
    <div className="max-w-3xl mt-20 text-gray-900 text-lg text-center">
      <p className="leading-relaxed font-bold">
        “You’ve reached the finish line — hiring just got awesome with AIQuestify! ✨”
      </p>
    </div>
  </div>
</section>

       <section id="pricing" ref={refStep4} className={`relative z-10 container mx-auto px-6 py-20 md:py-24 lg:py-32 text-center ${inViewStep4 ? 'animate-slideInRight' : 'opacity-0'}`}>
             <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900 animate-fadeUp">
                 Simple & Transparent Pricing
             </h2>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                 {/* Pricing Card 1: Basic */}
                 <div className="bg-white bg-opacity-80 p-8 rounded-xl shadow-xl border border-gray-200 flex flex-col items-center animate-slideInLeft animation-delay-300 transform hover:scale-105 transition-transform duration-300">
                     <h3 className="text-2xl font-bold text-gray-900 mb-4">Basic</h3>
                     <p className="text-gray-700 text-lg mb-6 font-medium">Perfect for small teams</p>
                     <div className="text-4xl font-extrabold text-blue-600 mb-6">
                         $49<span className="text-xl font-medium text-gray-600">/month</span>
                     </div>
                     <ul className="text-left text-gray-700 space-y-3 mb-8">
                         <li className="flex items-center"><CheckCircle size={20} className="text-green-500 mr-2" /> 10 AI Interviews/month</li>
                         <li className="flex items-center"><CheckCircle size={20} className="text-green-500 mr-2" /> Basic AI Rating</li>
                         <li className="flex items-center"><CheckCircle size={20} className="text-green-500 mr-2" /> Candidate Link Sharing</li>
                         <li className="flex items-center"><CheckCircle size={20} className="text-green-500 mr-2" /> Standard Reporting</li>
                         <li className="flex items-center text-gray-500"><X size={20} className="text-red-500 mr-2" /> Live Interview Scheduling</li> 
                         <li className="flex items-center text-gray-500"><X size={20} className="text-red-500 mr-2" /> Advanced Recommendations</li> 
                     </ul>
                     <div className="flex justify-center w-full space-x-4 mt-14">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-3 text-lg shadow-md transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 font-semibold cursor-pointer">Choose Basic</Button>
            </div>                 </div>

                 {/* Pricing Card 2: Pro (Featured) */}
                 <div className="bg-white bg-opacity-80 p-8 rounded-xl shadow-xl border-2 border-blue-600 flex flex-col items-center animate-fadeInUp animation-delay-600 transform hover:scale-105 transition-transform duration-300 relative overflow-hidden"> 
                     <div className="absolute top-0 left-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-br-lg">Popular</div>
                     <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-4">Pro</h3> 
                     <p className="text-gray-700 text-lg mb-6 font-medium">Ideal for growing teams</p>
                     <div className="text-4xl font-extrabold text-purple-600 mb-6"> 
                         $99<span className="text-xl font-medium text-gray-600">/month</span>
                     </div>
                     <ul className="text-left text-gray-700 space-y-3 mb-8">
                         <li className="flex items-center"><CheckCircle size={20} className="text-green-500 mr-2" /> 50 AI Interviews/month</li>
                         <li className="flex items-center"><CheckCircle size={20} className="text-green-500 mr-2" /> Advanced AI Rating</li>
                         <li className="flex items-center"><CheckCircle size={20} className="text-green-500 mr-2" /> Candidate Link Sharing</li>
                         <li className="flex items-center"><CheckCircle size={20} className="text-green-500 mr-2" /> Detailed Reporting</li>
                         <li className="flex items-center"><CheckCircle size={20} className="text-green-500 mr-2" /> Live Interview Scheduling</li>
                         <li className="flex items-center"><CheckCircle size={20} className="text-green-500 mr-2" /> Basic Recommendations</li>
                     </ul>
                     <div className="flex justify-center w-full space-x-4 mt-10">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full px-8 py-3 text-lg shadow-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 font-semibold cursor-pointer">Choose Pro</Button>
            </div>                 </div>

                 {/* Pricing Card 3: Enterprise */}
                 <div className="bg-white bg-opacity-80 p-8 rounded-xl shadow-xl border border-gray-200 flex flex-col items-center animate-slideInRight animation-delay-900 transform hover:scale-105 transition-transform duration-300">
                     <h3 className="text-2xl font-bold text-gray-900 mb-4">Enterprise</h3>
                     <p className="text-gray-700 text-lg mb-6 font-medium">For large organizations</p>
                     <div className="text-4xl font-extrabold text-teal-600 mb-6">
                         Custom
                     </div>
                     <ul className="text-left text-gray-700 space-y-3 mb-8">
                         <li className="flex items-center"><CheckCircle size={20} className="text-green-500 mr-2" /> Unlimited AI Interviews</li>
                         <li className="flex items-center"><CheckCircle size={20} className="text-green-500 mr-2" /> Custom AI Rating Models</li>
                         <li className="flex items-center"><CheckCircle size={20} className="text-green-500 mr-2" /> Advanced Link Sharing Options</li>
                         <li className="flex items-center"><CheckCircle size={20} className="text-green-500 mr-2" /> Custom Reporting & Analytics</li>
                         <li className="flex items-center"><CheckCircle size={20} className="text-green-500 mr-2" /> Integrated Live Scheduling</li>
                         <li className="flex items-center"><CheckCircle size={20} className="text-green-500 mr-2" /> Advanced Recommendations</li>
                          <li className="flex items-center"><CheckCircle size={20} className="text-green-500 mr-2" /> Dedicated Support</li>
                     </ul>
                     <div className="flex justify-center w-full space-x-4">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-3 text-lg shadow-md transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 font-semibold cursor-pointer">Contact Us</Button>
            </div>                 </div>
             </div>
         </section>

        <section id="testimonials" ref={refStep6} className={`relative z-10 container mx-auto px-6 py-20 md:py-24 lg:py-32 text-center ${inViewStep6 ? 'bounce-in' : 'opacity-0'}`} >
             <h2 className="text-3xl md:text-4xl font-bold mb-16 text-gray-900 animate-fadeInUp">
                 What Our Clients Say
             </h2>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {/* Testimonial Card 1 */}
                 <div className="bg-gray-900 bg-opacity-50 p-6 rounded-lg shadow-lg border-2 border-gray-800 hover:border-blue-600 hover:shadow-2xl animate-fadeUp animation-delay-300 transform hover:scale-105 transition-transform duration-300 flex flex-col items-center cursor-pointer">
                     <MessageSquare size={40} className="text-cyan-400 mb-4" />
                     <p className="text-gray-400 text-lg mb-4 font-medium">
                         "AIQuestify has revolutionized our initial screening process. We save hours and get better insights."
                     </p>
                     <p className="text-white font-semibold">- Sarah J., Hiring Manager</p>
                 </div>
                  {/* Testimonial Card 2 */}
                 <div className="bg-gray-900 bg-opacity-50 p-6 rounded-lg shadow-lg border-2 border-gray-800 hover:border-fuchsia-600 hover:shadow-2xl animate-fadeUp animation-delay-600 transform hover:scale-105 transition-transform duration-300 flex flex-col items-center">
                     <Users size={40} className="text-fuchsia-400 mb-4" />
                     <p className="text-gray-400 text-lg mb-4 font-medium">
                         "The AI interviews feel natural, and the recommendations are spot-on. Great tool!"
                     </p>
                     <p className="text-white font-semibold">- David K., Tech Lead</p>
                 </div>
                  {/* Testimonial Card 3 */}
                 <div className="bg-gray-900 bg-opacity-50 p-6 rounded-lg shadow-lg border-2 border-gray-800 hover:border-yellow-400 hover:shadow-2xl animate-fadeInUp animation-delay-900 transform hover:scale-105 transition-transform duration-300 flex flex-col items-center">
                      <Star size={40} className="text-yellow-400 mb-4" /> 
                     <p className="text-gray-400 text-lg mb-4 font-medium">
                         "Easy to use and provides valuable, unbiased feedback. Highly recommend."
                     </p>
                     <p className="text-white font-semibold">- Emily R., HR Specialist</p>
                 </div>
             </div>
        </section>

         <section id="faq"  ref={refStep5} className={`relative z-10 container mx-auto px-6 py-20 md:py-24 lg:py-32 ${inViewStep5 ? 'slide-in-top':'opacity-0'}`}>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900 animate-fadeInUp">
                  Frequently Asked Questions
              </h2>
              <div className="max-w-3xl mx-auto space-y-4 animate-fadeInUp animation-delay-500">
                  <Accordion title="What kind of questions does the AI ask?">
                      <p className="text-gray-600 font-medium">
                          Our AI uses a dynamic questioning engine that adapts based on the candidate's responses, the job description, and the skills you define. It asks a mix of behavioral, technical (if applicable), and situational questions.
                      </p>
                  </Accordion>
                   <Accordion title="How accurate are the AI ratings?">
                       <p className="text-gray-600 font-medium">
                           The AI ratings are based on analyzing various factors including communication clarity, relevance of answers, confidence, and specific keywords related to the required skills. While highly accurate, they are best used as a screening tool in conjunction with human review.
                       </p>
                   </Accordion>
                    <Accordion title="Can I customize the interview questions?">
                       <p className="text-gray-600 font-medium">
                           Yes, absolutely! Our platform allows you to fully customize the interview questions or use our AI-suggested questions as a starting point.
                       </p>
                   </Accordion>
                    <Accordion title="How do I share the interview with candidates?">
                       <p className="text-gray-600 font-medium">
                           Once you create an interview, you can generate unique shareable links directly from your dashboard. Simply send this link to your candidates via email or your preferred communication method.
                       </p>
                   </Accordion>
                     <Accordion title="Is it possible to schedule live follow-up interviews?">
                       <p className="text-gray-600 font-medium">
                           Yes, our platform includes tools to easily schedule live follow-up interviews with candidates directly from their profile or rating report.
                       </p>
                   </Accordion>
              </div>
         </section>


       {/* Call to Action Section */}
       <section className="relative z-10 container mx-auto px-6 py-20 md:py-24 lg:py-32 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 animate-fadeInUp"> 
                Ready to Transform Your Hiring?
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto animate-fadeInUp animation-delay-300 font-medium"> 
                Join companies who are streamlining their interview process and finding the best talent faster.
            </p>
             <div className="flex justify-center space-x-4 animate-fadeInUp animation-delay-600">
                <Button onClick={handleDashboardClick} className="bg-gradient-to-r from-fuchsia-500 to-pink-600 hover:from-fuchsia-600 hover:to-pink-700 text-white rounded-full px-8 py-3 text-lg shadow-lg transition duration-300 flex items-center transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:ring-opacity-50 font-semibold cursor-pointer">
                    Get Started Free <ArrowRight className="ml-2" size={20} />
                </Button>
                 {/* Link to Dashboard/Sign-In */}
                <Link href={supabaseGoogleSignInUrl} passHref>
                    <Button variant="outline" onClick={handleDashboardClick} className="border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white rounded-full px-8 py-3 text-lg transition duration-300 flex items-center gap-2 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50 font-semibold cursor-pointer">
                       <LayoutDashboard size={20} /> Go to Dashboard
                    </Button>
                </Link>
            </div>
       </section>

       <section className=" text-black py-16 px-6 md:px-10 lg:px-20 mb-10">
  <div className="max-w-7xl mx-auto text-center">
    <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fadeInUp">
      Why Teams Choose Our AI Interview Platform
    </h2>
    <p className="text-gray-400 text-lg md:text-xl mb-12 animate-fadeInUp animation-delay-200">
      We empower hiring teams to identify top talent faster, reduce bias, and streamline interviews with smart AI tools.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Feature 1: AI-Powered Insights */}
      <div className="bg-gray-800 p-6 rounded-2xl shadow-md
                      transition duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-xl
                      animate-fadeInUp animation-delay-400">
        <div className="flex items-center justify-center md:justify-start mb-2">
          <svg className="w-6 h-6 text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
          </svg>
          <h3 className="text-xl text-white font-semibold">AI-Powered Insights</h3>
        </div>
        <p className="text-gray-400 text-center md:text-left">Analyze candidate responses with smart feedback to make better hiring decisions.</p>
      </div>

      {/* Feature 2: Automated Assessments */}
      <div className="bg-gray-800 p-6 rounded-2xl shadow-md
                      transition duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-xl
                      animate-fadeInUp animation-delay-500">
         <div className="flex items-center justify-center md:justify-start mb-2">
          <svg className="w-6 h-6 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 21h7a2 2 0 002-2V9a2 2 0 00-2-2h-7m0 10l3-3m0 0l3 3m-3-3v6m-9 3H4a2 2 0 01-2-2V7a2 2 0 012-2h9a2 2 0 012 2v10a2 2 0 01-2 2m-9 0a2 2 0 002-2m-9 0h9m-9 0l-2 2m9-2a2 2 0 01-2 2"></path>
          </svg>
          <h3 className="text-xl text-white font-semibold">Automated Assessments</h3>
        </div>
        <p className="text-gray-400 text-center md:text-left">Automatically score and rank candidates based on predefined criteria and performance.</p>
      </div>

      {/* Feature 3: Seamless Scheduling */}
      <div className="bg-gray-800 p-6 rounded-2xl shadow-md
                      transition duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-xl
                      animate-fadeInUp animation-delay-600"> 
         <div className="flex items-center justify-center md:justify-start mb-2">
          <svg className="w-6 h-6 text-purple-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2zm7-3h.01"></path>
          </svg>
          <h3 className="text-xl text-white font-semibold">Seamless Scheduling</h3>
        </div>
        <p className="text-gray-400 text-center md:text-left">Built-in scheduling and video calls reduce coordination time with candidates.</p>
      </div>
    </div>
  </div>
</section>


      {/* Footer */}
      <footer className="relative z-10 bg-gradient-to-b from-black via-gray-900 to-black text-gray-400 py-16 px-6 md:px-12 lg:px-24 border-t border-gray-800">
  <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
    {/* Brand Info */}
    <div>
      <h3 className="text-2xl font-bold text-cyan-400 mb-4">AIQuestify</h3>
      <p className="text-sm font-medium leading-relaxed">
        AI-Powered Interview Solutions that help you hire smarter and faster.
      </p>
    </div>

    {/* Quick Links */}
    <div>
      <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
      <ul className="space-y-2 text-sm">
        {["Features", "How it Works", "Pricing", "Testimonials", "FAQ"].map((item) => (
          <li key={item}>
            <Link
              href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
              className="hover:text-cyan-400 transition font-medium"
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </div>

    {/* Legal */}
    <div>
      <h4 className="text-lg font-semibold text-white mb-4">Legal</h4>
      <ul className="space-y-2 text-sm">
        <li>
          <Link href="/privacy" className="hover:text-cyan-400 transition font-medium">
            Privacy Policy
          </Link>
        </li>
        <li>
          <Link href="/terms" className="hover:text-cyan-400 transition font-medium">
            Terms of Service
          </Link>
        </li>
      </ul>
    </div>

    {/* Contact & Social */}
    <div>
  <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
  
  <p className="text-sm font-medium flex items-center gap-2 text-gray-400">
    <Mail className="w-4 h-4 text-cyan-400" />
    <a href="mailto:javadava7704.js@gmail.com" className="hover:underline">
      javadava7704.js@gmail.com
    </a>
  </p>

  <div className="flex items-center space-x-4 mt-4">
    <Link
      href="https://linkedin.com"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-400 hover:text-cyan-400 transition"
    >
      <Linkedin className="w-5 h-5" />
    </Link>
    <Link
      href="https://twitter.com"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-400 hover:text-cyan-400 transition"
    >
      <Twitter className="w-5 h-5" />
    </Link>
    <Link
      href="https://github.com"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-400 hover:text-cyan-400 transition"
    >
      <Github className="w-5 h-5" />
    </Link>
  </div>
</div>

  </div>

  {/* Bottom Notice */}
  <div className="text-center text-xs mt-12 border-t border-gray-800 pt-6 text-gray-500">
    © {new Date().getFullYear()} AIQuestify · Built with ❤️ by{" "}
    <Link
      href="https://www.linkedin.com/in/javad-sheikhalishahi-60094629b/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-500 font-semibold hover:text-indigo-400 transition underline underline-offset-4"
    >
      Javad Sheikhalishahi
    </Link>
  </div>
</footer>

    </div>
  );
}


function Button({ children, className, variant, ...props }) {
    const baseStyle = "px-4 py-2 rounded transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900";
    const variants = {
        default: "bg-blue-600 hover:bg-blue-700 text-white",
        outline: "border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
        ghost: "hover:bg-gray-700 text-white",
    };
    const variantStyle = variants[variant] || variants.default;

    return (
        <button className={`${baseStyle} ${variantStyle} ${className}`} {...props}>
            {children}
        </button>
    );
}
