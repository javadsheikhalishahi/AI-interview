import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { InterviewType } from "@/services/Constants";
import { ArrowRightFromLine, Check, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const jobSuggestions = [
  // General Development
  "Full-Stack Developer",
  "Frontend Developer",
  "Backend Developer",
  "Software Engineer",
  "Web Developer",

  // Frontend Specific
  "React Developer",
  "Vue.js Developer",
  "Next.js Developer",
  "Angular Developer",
  "Svelte Developer",

  // Backend Specific
  "Node.js Developer",
  "Django Developer",
  "Ruby on Rails Developer",
  "Spring Boot Developer",
  "Go Developer",

  // Mobile Development
  "Mobile App Developer",
  "iOS Developer",
  "Android Developer",
  "Flutter Developer",
  "React Native Developer",

  // Data & AI
  "Data Scientist",
  "Machine Learning Engineer",
  "AI Researcher",
  "Data Analyst",
  "Business Intelligence Analyst",
  "Data Engineer",

  // DevOps & Infra
  "DevOps Engineer",
  "Cloud Engineer",
  "Cloud Architect",
  "Site Reliability Engineer",
  "Infrastructure Engineer",

  // Design
  "UI/UX Designer",
  "Product Designer",
  "UX Researcher",
  "Interaction Designer",
  "Visual Designer",

  // Security
  "Cybersecurity Analyst",
  "Security Engineer",
  "Ethical Hacker",
  "Penetration Tester",

  // Management & Product
  "Product Manager",
  "Technical Project Manager",
  "Scrum Master",
  "Program Manager",
  "Agile Coach",

  // Emerging Tech
  "Blockchain Developer",
  "Web3 Engineer",
  "AR/VR Developer",
  "IoT Developer",
  "Robotics Engineer",

  // Testing & QA
  "QA Engineer",
  "Test Automation Engineer",
  "Manual Tester",
  "Quality Assurance Analyst",

  // Misc
  "Technical Writer",
  "Game Developer",
  "Database Administrator",
  "Support Engineer",
  "Solutions Architect",
];

function FormContainer({ onHandleInputChange, GoToNext }) {
  const [isLoading, setIsLoading] = useState(false);
  const [interviewType, setInterviewType] = useState([]);
  const [JobPositionInput, setJobPositionInput] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (interviewType) {
      onHandleInputChange("type", interviewType);
    }
  }, [interviewType]);

  const AddInterviewType = (type) => {
    const data = interviewType.includes(type);
    if (!data) {
      setInterviewType((prev) => [...prev, type]);
    } else {
      const result = interviewType.filter((item) => item !== type);
      setInterviewType(result);
    }
  };

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const handleJobPositionChange = (event) => {
    const value = event.target.value;
    setJobPositionInput(value);
    onHandleInputChange("JobPosition", value);
    if (value.length > 0) {
      const suggestions = jobSuggestions.filter((job) =>
        job.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(suggestions);
    } else {
      setFilteredSuggestions([]);
    }
  };

  const [showButton, setShowButton] = useState(false);

useEffect(() => {
  const timer = setTimeout(() => {
    setShowButton(true);
  }, 3700); 

  return () => clearTimeout(timer);
}, []);

const handlePaste = (e) => {
  const paste = e.clipboardData.getData("text");
  const totalLength = description.length + paste.length;

  if (totalLength > 3000) {
    e.preventDefault();
    // Optional: Show a temporary alert or use a toast library here
    toast.error("📝 Oops! Max allowed is 3000 characters. Please shorten it.");
  }
};

  return (
    <div className="bg-white border border-gray-300 shadow-2xl max-w-7xl rounded-2xl p-5 mt-5 animate-slideInRight">
      <div className="animate-slideInRight1">
        <h2 className="text-sm font-medium">Job Position</h2>
        <Input
          placeholder="Example: Full-Stack Developer"
          className="mt-2"
          value={JobPositionInput}
          onChange={handleJobPositionChange}
        />
        {filteredSuggestions.length > 0 && (
          <ul className="bg-white border rounded-md mt-1 shadow-md max-h-32 overflow-y-auto text-sm">
            {filteredSuggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => {
                  setJobPositionInput(suggestion);
                  onHandleInputChange("JobPosition", suggestion);
                  setFilteredSuggestions([]);
                }}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="mt-5 animate-slideInRight2">
        <h2 className="text-sm font-medium">Job Description</h2>
        <Textarea
  placeholder="Enter details job description"
  className={cn(
    "h-[200px] max-w-3xl mt-2",
    description.length > 3000 && "border-rose-500"
  )}
  value={description}
  onChange={(event) => {
    const value = event.target.value;
    if (value.length <= 3000) {
      setDescription(value);
      onHandleInputChange("JobDescription", value);
    }
  }}
  onPaste={handlePaste}
/>
<p
  className={cn(
    "text-xs mt-1 text-right",
    description.length > 3000 ? "text-rose-500 font-semibold" : "text-muted-foreground"
  )}
>
  {description.length} / 3000 characters
</p>
      </div>
      <div className="mt-5 animate-slideInRight3">
        <h2 className="text-sm font-medium">Interview Duration</h2>
        <Select
          onValueChange={(value) =>
            onHandleInputChange("InterviewDuration", value)
          }
        >
          <SelectTrigger className="w-full mt-2 cursor-pointer">
            <SelectValue placeholder="Select Duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem className="cursor-pointer" value="5 Min">
              5 Min
            </SelectItem>
            <SelectItem className="cursor-pointer" value="15 Min">
              15 Min
            </SelectItem>
            <SelectItem className="cursor-pointer" value="30 Min">
              30 Min
            </SelectItem>
            <SelectItem className="cursor-pointer" value="45 Min">
              45 Min
            </SelectItem>
            <SelectItem className="cursor-pointer" value="60 Min">
              60 Min
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="mt-5 animate-slideInRight4">
        <h2 className="text-sm font-medium">Interview Type</h2>
        <div className="flex flex-wrap gap-3 mt-2">
          {InterviewType.map((type, index) => {
            const isSelected = interviewType.includes(type.title);
            return (
              <div
                key={index}
                onClick={() => AddInterviewType(type.title)}
                className={cn(
                  "relative flex items-center gap-2 px-3 py-1.5 rounded-full border cursor-pointer transition-all duration-300 transform group",
                  isSelected
                    ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white scale-105 shadow-md shadow-gray-700"
                    : "bg-slate-100 hover:bg-slate-200 text-gray-700 hover:scale-105"
                )}
              >
                <type.icon className="h-4 w-4 shrink-0" />
                <span className="font-medium text-sm">{type.title}</span>

                {isSelected && (
                  <Check className="absolute -top-2 -right-2 h-4 w-4 text-green-200 bg-green-600 rounded-full p-0.5 shadow-md transition-transform group-hover:scale-110" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-end mt-7" onClick={() => GoToNext()}>
      {showButton && (
        <Button
          onClick={handleClick}
          disabled={isLoading}
          className={cn(
            "flex items-center justify-center gap-2 bg-gradient-to-r from-stone-900 to-black hover:from-blue-600 hover:to-indigo-700 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer animate-buttonEntrance1 px-4 py-2",
            "shadow-lg shadow-black",
            isLoading
              ? "bg-gradient-to-r from-blue-500 to-indigo-600 cursor-wait"
              : "bg-gradient-to-r from-stone-900 to-black hover:from-blue-600 hover:to-indigo-700 hover:scale-105"
          )}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 text-white mr-2 animate-spin" />
              <span className="text-sm animate-pulse">Loading...</span>
            </>
          ) : (
            <>
              <span className="text-sm">Generate Question</span>
              <ArrowRightFromLine className="w-4 h-4" />
            </>
          )}
        </Button>
        )}
      </div>
    </div>
  );
}

export default FormContainer;
