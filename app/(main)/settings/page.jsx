"use client";
import { supabase } from "@/services/supabaseClient";
import {
  Bell,
  Brain,
  BrainCircuit,
  CornerDownLeft,
  LucideVideotape,
  Mic,
  Palette,
  Settings,
  ShieldQuestionIcon,
  Timer,
  Trash2,
  User2,
  Video,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import ContactUsModal2 from "../billing/_components/ContactUsModal2";

const loadSettings = (key, initialState) => {
  if (typeof window !== "undefined") {
    const savedSettings = localStorage.getItem(key);
    if (savedSettings) {
      try {
        return JSON.parse(savedSettings);
      } catch (e) {
        console.error(
          `Failed to parse settings from localStorage for key "${key}":`,
          e
        );
        return initialState;
      }
    }
  }
  return initialState;
};

const saveSettings = (key, settings) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(settings));
  }
};

export default function SettingsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [accountSettings, setAccountSettings] = useState(
    loadSettings("aiInterviewAccountSettings", {
      username: "Interviewee Name",
      email: "user@aiinterview.com",
      emailNotifications: true,
    })
  );

  const handleContactClick2 = () => {
    setIsModalOpen(true);
  };

  const [profilePicturePreviewUrl, setProfilePicturePreviewUrl] = useState(null);

useEffect(() => {
  const savedProfilePicture = loadSettings("aiInterviewProfilePicturePreviewUrl", null);
  setProfilePicturePreviewUrl(savedProfilePicture);
}, []);

  const [profilePicture, setProfilePicture] = useState(null);

  const [interviewSettings, setInterviewSettings] = useState({
    defaultQuestionTime: "30",
    difficulty: "easy",
    autoProceed: false,
  });

  const [recordingSettings, setRecordingSettings] = useState(
    loadSettings("aiInterviewRecordingSettings", {
      recordVideo: true,
      recordAudio: true,
      includeAiInRecording: false,
    })
  );

  const [feedbackSettings, setFeedbackSettings] = useState(
    loadSettings("aiInterviewFeedbackSettings", {
      feedbackLevel: "detailed",
      feedbackFrequency: "after_interview",
      focusFeedbackOn: {
        content: true,
        delivery: true,
        confidence: false,
        bodyLanguage: false,
      },
    })
  );

  const [appearanceSettings, setAppearanceSettings] = useState(
    loadSettings("aiInterviewAppearanceSettings", {
      theme: "system",
      fontSize: "medium",
      showTimer: true,
    })
  );

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const fileInputRef = useRef(null);

  const handleInputChange = (section, e) => {
    const { id, value } = e.target;
    if (section === "account") {
      setAccountSettings({ ...accountSettings, [id]: value });
    } else if (section === "interview") {
      setInterviewSettings({ ...interviewSettings, [id]: value });
    } else if (section === "appearance") {
      setAppearanceSettings({ ...appearanceSettings, [id]: value });
    }
  };

  const handleToggleChange = (section, e) => {
    const { id, checked } = e.target;
    if (section === "account") {
      setAccountSettings({ ...accountSettings, [id]: checked });
    } else if (section === "interview") {
      setInterviewSettings({ ...interviewSettings, [id]: checked });
    } else if (section === "recording") {
      setRecordingSettings({ ...recordingSettings, [id]: checked });
    } else if (section === "appearance") {
      setAppearanceSettings({ ...appearanceSettings, [id]: checked });
    } else if (section === "feedback") {
      setFeedbackSettings({ ...feedbackSettings, [id]: checked });
    }
  };

  const handleFeedbackFocusChange = (e) => {
    const { id, checked } = e.target;
    setFeedbackSettings({
      ...feedbackSettings,
      focusFeedbackOn: {
        ...feedbackSettings.focusFeedbackOn,
        [id]: checked,
      },
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePicture(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicturePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setProfilePicture(null);
      setProfilePicturePreviewUrl(null);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    saveSettings("aiInterviewAccountSettings", accountSettings);
    saveSettings("aiInterviewInterviewSettings", interviewSettings);
    saveSettings("aiInterviewRecordingSettings", recordingSettings);
    saveSettings("aiInterviewFeedbackSettings", feedbackSettings);
    saveSettings("aiInterviewAppearanceSettings", appearanceSettings);
    saveSettings(
      "aiInterviewProfilePicturePreviewUrl",
      profilePicturePreviewUrl
    );

    console.log("Simulating API save:", {
      account: accountSettings,
      interview: interviewSettings,
      recording: recordingSettings,
      feedback: feedbackSettings,
      appearance: appearanceSettings,
      profilePictureFile: profilePicture,
      profilePicturePreviewUrl: profilePicturePreviewUrl,
    });

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSaving(false);
    setSaveSuccess(true);

    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };

  const handleDeleteAccount = async () => {
    const confirmed = confirm("Are you sure you want to delete your account? This action is irreversible.");
    
    if (confirmed) {
      const { error } = await supabase.auth.signOut();  
      if (error) {
       toast.error("Error signing out: " + error.message);
        return;
      }
      
      // Deleting the user from the database
      const { error: deleteError } = await supabase.auth.api.deleteUser(supabase.auth.user()?.id);
  
      if (deleteError) {
        toast.error("Error deleting account: " + deleteError.message);
      } else {
        toast.success("Account successfully deleted.");
      }
    }
  };
  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);
  const openModal2 = () => setIsDeleteModalOpen(true);

  const closeModal2 = () => setIsDeleteModalOpen(false);

  const [isOptedOut, setIsOptedOut] = useState(false);

  const handleToggle = () => {
    const newValue = !isOptedOut;
    setIsOptedOut(newValue);
    toast.success(
      newValue
        ? "You've opted out of AI data training."
        : "You've opted back in to AI data training."
    );
  };

  return (
    <div className="min-h-screen py-1 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="mx-auto bg-transparent text-white rounded-xl overflow-hidden">
        <div className="px-6 py-8 sm:p-10">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 mb-8 border-b border-gray-600 pb-4">
            Settings
          </h1>

          <form onSubmit={handleSaveSettings} className="space-y-10">
            <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6 rounded-lg shadow-2xl border border-gray-200">
              <h2 className=" flex items-center gap-2 text-2xl font-semibold text-gray-100 mb-6 pb-4 border-b border-gray-200 ">
              <User2 className="w-6 h-6 text-blue-400"/>  Profile
              </h2>

              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                {/* Profile Picture */}
                <div className="flex-shrink-0">
                  <div
                    className="w-36 h-36 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm font-medium cursor-pointer overflow-hidden shadow-inner hover:opacity-90 transition-opacity border-4 border-white ring-2 ring-blue-500/50"
                    onClick={triggerFileInput}
                    title="Click to upload profile picture"
                  >
                    {profilePicturePreviewUrl && (
                      <img
                        src={profilePicturePreviewUrl}
                        alt="Profile Preview"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>

                {/* Account Info Fields */}
                <div className="flex-grow grid grid-cols-1 gap-y-6 w-full">
                  {/* Username */}
                  <div>
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-200 mb-1"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      value={accountSettings.username}
                      onChange={(e) => handleInputChange("account", e)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-400 placeholder-gray-400 transition duration-150 ease-in-out"
                      placeholder="e.g., Jane Doe"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-200 mb-1"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={accountSettings.email}
                      onChange={(e) => handleInputChange("account", e)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500  text-gray-400 placeholder-gray-400 dark:placeholder-gray-500 transition duration-150 ease-in-out"
                      placeholder="e.g., your.email@example.com"
                    />
                  </div>

                  {/* Email Notifications Toggle */}
                  <div className="flex items-center justify-between col-span-full mt-3">
                    <span className="flex items-center gap-1 text-sm font-medium text-gray-100">
                      <Bell className="w-5 h-5 text-yellow-400" />
                      Email Notifications
                    </span>
                    <label
                      htmlFor="emailNotifications"
                      className="flex items-center cursor-pointer"
                    >
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="emailNotifications"
                          className="sr-only"
                          checked={accountSettings.emailNotifications}
                          onChange={(e) => handleToggleChange("account", e)}
                        />
                        <div
                          className={`block w-14 h-8 rounded-full transition-colors duration-200 ease-in-out ${accountSettings.emailNotifications ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"}`}
                        ></div>
                        <div
                          className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-200 ease-in-out ${accountSettings.emailNotifications ? "translate-x-full" : ""}`}
                        ></div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </section>

            {/* Interview Preferences Section */}
            <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6 rounded-lg shadow-md border border-gray-200">
              <h2 className="flex items-center gap-2 text-2xl font-semibold text-gray-100 dark:text-gray-100 mb-6 pb-4 border-b border-gray-200 ">
               <Settings className="w-6 h-6 text-cyan-400"/> Interview Preferences
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Default Question Time */}
                <div>
                  <label
                    htmlFor="defaultQuestionTime"
                    className="block text-sm font-medium text-gray-200 mb-1"
                  >
                    Default Question Time
                  </label>
                  <select
                    id="defaultQuestionTime"
                    value={interviewSettings.defaultQuestionTime}
                    onChange={(e) => handleInputChange("interview", e)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-400 transition duration-500 ease-in-out"
                  >
                    <option value="30" className="text-black">
                      30 seconds
                    </option>
                    <option value="45" className="text-black">
                      45 seconds
                    </option>
                    <option value="60" className="text-black">
                      60 seconds
                    </option>
                    <option value="90" className="text-black">
                      90 seconds
                    </option>
                    <option value="120" className="text-black">
                      120 seconds
                    </option>
                  </select>
                </div>

                {/* Difficulty */}
                <div>
                  <label
                    htmlFor="difficulty"
                    className="block text-sm font-medium text-gray-200 mb-1"
                  >
                    Difficulty
                  </label>
                  <select
                    id="difficulty"
                    value={interviewSettings.difficulty}
                    onChange={(e) => handleInputChange("interview", e)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500  text-gray-400 transition duration-500 ease-in-out"
                  >
                    <option value="easy" className="text-black">
                      Easy
                    </option>
                    <option value="medium" className="text-black">
                      Medium
                    </option>
                    <option value="hard" className="text-black">
                      Hard
                    </option>
                  </select>
                </div>

                {/* Automatically Proceed Toggle */}
                <div className="flex items-center justify-between md:col-span-2 mt-2">
                  <span className="flex items-center gap-1 text-sm font-medium text-gray-100 ">
                    <ShieldQuestionIcon className="w-5 h-5 text-purple-500" />{" "}
                    Automatically Proceed to Next Question
                  </span>
                  <label
                    htmlFor="autoProceed"
                    className="flex items-center cursor-pointer"
                  >
                    <div className="relative">
                      <input
                        type="checkbox"
                        id="autoProceed"
                        className="sr-only"
                        checked={interviewSettings.autoProceed}
                        onChange={(e) => handleToggleChange("interview", e)}
                      />
                      <div
                        className={`block w-14 h-8 rounded-full transition-colors duration-200 ease-in-out ${interviewSettings.autoProceed ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"}`}
                      ></div>
                      <div
                        className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-200 ease-in-out ${interviewSettings.autoProceed ? "translate-x-full" : ""}`}
                      ></div>
                    </div>
                  </label>
                </div>
              </div>
            </section>

            {/* Recording Settings Section */}
            <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6 rounded-lg shadow-md border border-gray-200">
              <h2 className="flex items-center gap-2 text-2xl font-semibold text-gray-100 dark:text-gray-100 mb-6 pb-4 border-b border-gray-200">
               <LucideVideotape className="w-5 h-5 text-emerald-400"/>  Recording
              </h2>

              <div className="space-y-6">
                {/* Record Video Toggle */}
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-md font-medium text-gray-200">
                    <Video className="w-6 h-6 text-emerald-500" /> Record Video
                  </span>
                  <label
                    htmlFor="recordVideo"
                    className="flex items-center cursor-pointer"
                  >
                    <div className="relative">
                      <input
                        type="checkbox"
                        id="recordVideo"
                        className="sr-only"
                        checked={recordingSettings.recordVideo}
                        onChange={(e) => handleToggleChange("recording", e)}
                      />
                      <div
                        className={`block w-14 h-8 rounded-full transition-colors duration-500 ease-in-out ${recordingSettings.recordVideo ? "bg-blue-600" : "bg-gray-300"}`}
                      ></div>
                      <div
                        className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-500 ease-in-out ${recordingSettings.recordVideo ? "translate-x-full" : ""}`}
                      ></div>
                    </div>
                  </label>
                </div>

                {/* Record Audio Toggle */}
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-md font-medium text-gray-200">
                    <Mic className="w-6 h-6 text-rose-500" /> Record Audio
                  </span>
                  <label
                    htmlFor="recordAudio"
                    className="flex items-center cursor-pointer"
                  >
                    <div className="relative">
                      <input
                        type="checkbox"
                        id="recordAudio"
                        className="sr-only"
                        checked={recordingSettings.recordAudio}
                        onChange={(e) => handleToggleChange("recording", e)}
                      />
                      <div
                        className={`block w-14 h-8 rounded-full transition-colors duration-200 ease-in-out ${recordingSettings.recordAudio ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"}`}
                      ></div>
                      <div
                        className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-200 ease-in-out ${recordingSettings.recordAudio ? "translate-x-full" : ""}`}
                      ></div>
                    </div>
                  </label>
                </div>

                {/* Include AI in Recording Toggle */}
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-md font-medium text-gray-200">
                    <BrainCircuit className="w-6 h-6 text-purple-500" /> Include
                    AI Video Feed in Recording
                  </span>
                  <label
                    htmlFor="includeAiInRecording"
                    className="flex items-center cursor-pointer"
                  >
                    <div className="relative">
                      <input
                        type="checkbox"
                        id="includeAiInRecording"
                        className="sr-only"
                        checked={recordingSettings.includeAiInRecording}
                        onChange={(e) => handleToggleChange("recording", e)}
                      />
                      <div
                        className={`block w-14 h-8 rounded-full transition-colors duration-200 ease-in-out ${recordingSettings.includeAiInRecording ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"}`}
                      ></div>
                      <div
                        className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-200 ease-in-out ${recordingSettings.includeAiInRecording ? "translate-x-full" : ""}`}
                      ></div>
                    </div>
                  </label>
                </div>
              </div>
            </section>

            {/* AI Feedback Settings Section */}
            <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6 rounded-lg shadow-md border border-gray-200 ">
              <h2 className="flex items-center gap-2 text-2xl font-semibold text-gray-100 mb-6 pb-4 border-b border-gray-200">
              <Brain className="w-6 h-6 text-purple-400" /> AI Feedback
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Feedback Level */}
                <div>
                  <label
                    htmlFor="feedbackLevel"
                    className="block text-sm font-medium text-gray-200 mb-1"
                  >
                    Feedback Level
                  </label>
                  <select
                    id="feedbackLevel"
                    value={feedbackSettings.feedbackLevel}
                    onChange={(e) =>
                      setFeedbackSettings({
                        ...feedbackSettings,
                        feedbackLevel: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-md mt-1 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-400 transition duration-500 ease-in-out"
                  >
                    <option value="basic" className="text-black">
                      Basic
                    </option>
                    <option value="detailed" className="text-black">
                      Detailed
                    </option>
                  </select>
                </div>

                {/* Feedback Frequency */}
                <div>
                  <label
                    htmlFor="feedbackFrequency"
                    className="block text-sm font-medium text-gray-200 mb-1"
                  >
                    Feedback Frequency
                  </label>
                  <select
                    id="feedbackFrequency"
                    value={feedbackSettings.feedbackFrequency}
                    onChange={(e) =>
                      setFeedbackSettings({
                        ...feedbackSettings,
                        feedbackFrequency: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-400 transition duration-500 ease-in-out"
                  >
                    <option value="after_question" className="text-black">After Each Question</option>
                    <option value="after_interview" className="text-black">
                      After Entire Interview
                    </option>
                  </select>
                </div>

                {/* Focus Feedback On Checkboxes */}
                <div className="md:col-span-2 mt-2">
                  <span className="block text-sm font-medium text-gray-200 mb-4">
                    Focus Feedback On
                  </span>
                  {/* Styled Checkboxes */}
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 justify-items-center">
                    {/* Content */}
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="content"
                        checked={feedbackSettings.focusFeedbackOn.content}
                        onChange={handleFeedbackFocusChange}
                        className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition duration-500 ease-in-out"
                      />
                      <label
                        htmlFor="content"
                        className="ml-2 block text-sm text-gray-300"
                      >
                        Content
                      </label>
                    </div>
                    {/* Delivery */}
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="delivery"
                        checked={feedbackSettings.focusFeedbackOn.delivery}
                        onChange={handleFeedbackFocusChange}
                        className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition duration-500 ease-in-out"
                      />
                      <label
                        htmlFor="delivery"
                        className="ml-2 block text-sm text-gray-300"
                      >
                        Delivery
                      </label>
                    </div>
                    {/* Confidence */}
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="confidence"
                        checked={feedbackSettings.focusFeedbackOn.confidence}
                        onChange={handleFeedbackFocusChange}
                        className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition duration-500 ease-in-out"
                      />
                      <label
                        htmlFor="confidence"
                        className="ml-2 block text-sm text-gray-300"
                      >
                        Confidence
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Appearance Settings Section */}
            <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6 rounded-lg shadow-md border border-gray-200">
              <h2 className="flex items-center gap-2 text-2xl font-semibold text-gray-100 mb-6 pb-4 border-b border-gray-200">
              <Palette className="w-6 h-6 text-pink-400" /> Appearance
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Font Size */}
                <div>
                  <label
                    htmlFor="fontSize"
                    className="block text-sm font-medium text-gray-200 mb-1"
                  >
                    Font Size
                  </label>
                  <select
                    id="fontSize"
                    value={appearanceSettings.fontSize}
                    onChange={(e) => handleInputChange("appearance", e)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none
                     focus:ring-blue-500 focus:border-blue-500  text-gray-400 transition duration-500 ease-in-out"
                  >
                    <option value="small" className="text-black">
                      Small
                    </option>
                    <option value="medium" className="text-black">
                      Medium
                    </option>
                    <option value="large" className="text-black">
                      Large
                    </option>
                  </select>
                </div>
                {/* Layout Style */}
                <div>
                  <label
                    htmlFor="layoutStyle"
                    className="block text-sm font-medium text-gray-100 mb-1"
                  >
                    Layout Style
                  </label>
                  <select
                    id="layoutStyle"
                    value={appearanceSettings.layoutStyle}
                    onChange={(e) => handleInputChange("appearance", e)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-400 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-500 ease-in-out"
                  >
                    <option value="compact" className="text-black">
                      Compact
                    </option>
                    <option value="comfortable" className="text-black">
                      Comfortable
                    </option>
                    <option value="spacious" className="text-black">
                      Spacious
                    </option>
                  </select>
                </div>
                {/* Show Timer Toggle */}
                <div className="flex items-center justify-between md:col-span-2 mt-2">
                  <span className="flex items-center gap-2 text-sm font-medium text-gray-200">
                    <Timer className="w-5 h-5 text-yellow-400" /> Show Timer
                    During Interview
                  </span>
                  <label
                    htmlFor="showTimer"
                    className="flex items-center cursor-pointer"
                  >
                    <div className="relative">
                      <input
                        type="checkbox"
                        id="showTimer"
                        className="sr-only"
                        checked={appearanceSettings.showTimer}
                        onChange={(e) => handleToggleChange("appearance", e)}
                      />
                      <div
                        className={`block w-14 h-8 rounded-full transition-colors duration-200 ease-in-out ${appearanceSettings.showTimer ? "bg-blue-600" : "bg-gray-300"}`}
                      ></div>
                      <div
                        className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-200 ease-in-out ${appearanceSettings.showTimer ? "translate-x-full" : ""}`}
                      ></div>
                    </div>
                  </label>
                </div>
              </div>
            </section>

            {/* Privacy & Data */}
            <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6 rounded-lg shadow-md border border-gray-200">
              <h2 className="flex items-center gap-2 text-2xl font-semibold text-gray-100 dark:text-gray-100 mb-6 pb-4 border-b border-gray-200 ">
              <ShieldQuestionIcon className="w-6 h-6 text-red-400" /> Privacy & Data
              </h2>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-300 ">
                    Download My Data
                  </span>
                  <button
                    type="button"
                    className="flex px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-green-500
                              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-500 ease-in-out cursor-pointer"
                    onClick={handleContactClick2}
                  >
                    <span className="flex items-center gap-2"><CornerDownLeft className="w-5 h-5 text-green-700 " /> Request Data</span>
                    
                  </button>
                  <ContactUsModal2 isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
                </div>

                {/* Placeholder for Data Usage/Opt-out Toggle */}
                <div className="flex items-center justify-between">
      <span className="text-sm font-medium text-gray-300">
        Opt-out of Data for AI Training
      </span>
      <label
        htmlFor="optOutAiTraining"
        className="flex items-center cursor-pointer"
      >
        <div className="relative">
          <input
            type="checkbox"
            id="optOutAiTraining"
            className="sr-only"
            checked={isOptedOut}
            onChange={handleToggle}
          />
          <div
            className={`block w-14 h-8 rounded-full transition-colors duration-300 ${
              isOptedOut ? "bg-red-500" : "bg-green-500"
            }`}
          ></div>
          <div
            className={`dot absolute top-1 w-6 h-6 rounded-full bg-white transition-transform duration-300 transform ${
              isOptedOut ? "translate-x-6" : "translate-x-1"
            }`}
          ></div>
        </div>
      </label>
    </div>

                {/* Placeholder for Account Deletion Action */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
      <span className="text-sm font-medium text-rose-500">
      Delete My Account
      </span>
      <button
        type="button"
        className="px-4 py-2 border border-red-600 rounded-md shadow-sm text-sm font-medium text-red-600 bg-transparent hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-500 ease-in-out cursor-pointer"
        onClick={openModal2}
      >
        <span className="flex items-center gap-2"><Trash2 className="w-5 h-5 text-red-500" /> Delete Account</span>    
      </button>

      {/* Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold text-gray-800">Are you sure?</h2>
            <p className="text-sm text-gray-600 mb-4">
              This action is irreversible. Once deleted, your account cannot be recovered.
            </p>
            <div className="flex justify-between">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md cursor-pointer hover:scale-105"
                onClick={closeModal2}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-md cursor-pointer hover:scale-105"
                onClick={() => {
                  handleDeleteAccount();
                  closeModal2();
                }}
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
              </div>
            </section>

            {/* Save Button and Feedback */}
            <div className="flex items-center justify-end gap-4 pt-8 border-t border-gray-200">
              {isSaving && (
                <span className="text-blue-600 dark:text-blue-400 text-sm animate-pulse">
                  Saving...
                </span>
              )}
              {saveSuccess && (
                <span className="text-green-600 dark:text-green-400 text-sm">
                  Settings saved!
                </span>
              )}
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-8 border border-transparent shadow-sm text-base
                 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2
                 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-500 ease-in-out cursor-pointer"
                disabled={isSaving}
              >
                Save Settings
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
