import { BriefcaseIcon, CalendarDays, CodeXml, Crown, LayoutDashboardIcon, ListChecks, LucidePuzzle, Settings, UserRound, Wallet2 } from "lucide-react"

export const SideBarOptions = [
    {
        name: 'Dashboard',
        icon: LayoutDashboardIcon,
        path: '/dashboard',
        className:'transition-transform duration-200 ease-in-out hover:animate-pulse'
    },
    {
        name: 'Planned Interview',
        icon: CalendarDays,
        path: '/scheduled-interview',
        className:'transition-transform duration-200 ease-in-out hover:rotate-12'
    },
    {
        name: 'All Interview',
        icon: ListChecks,
        path: '/all-interview',
        className:'transition-transform duration-200 ease-in-out hover:rotate-12'
    },
    {
        name: 'Billing',
        icon: Wallet2,
        path: '/billing',
        className:'transition-transform duration-200 ease-in-out hover:animate-bounce'
    },
    {
        name: 'Settings',
        icon: Settings,
        path: '/settings',
        className: 'transition-transform duration-200 ease-in-out hover:animate-spin'
    },
]

export const InterviewType = [
    {
        title: 'Behavioral',
        icon: UserRound
    },
    {
        title: 'Technical',
        icon: CodeXml
    },
    {
        title: "Experience",
        icon: BriefcaseIcon
    },
    {
        title: 'Leadership',
        icon: Crown
    },
    {
        title: 'Problem Solving',
        icon: LucidePuzzle
    }
]

export const QUESTIONS_PROMPT = `You are a professional technical interviewer.

Based on the details below, generate a well-structured list of hight-quality interview questions:

Job Title: {{jobTitle}}

Job Description: {{JobDescription}}

Interview Duration: {{InterviewDuration}}

Interview Type: {{type}}

📝Your task:

Analyze the job description to identify key responsibilities, required skills, and expected experience.

Generate a list of interview questions depends on interview duration

Adjust the number and depth of questions to match the interview duration.

Ensure the questions match the tone and structure of a real-life {{type}} interview.

📦Format your response in JSON format with array list of questions.

format: interviewQuestions=[
{
question: '',
type: 'Technical/Behavioral/Experience/Problem Solving/Leadership'
},{
...
}]
🎯The goal is to create a structured, relevant, and time-optimized interview plan for a {{jobTitle}} role.`


export const FEEDBACK_PROMPT = `{{conversation}}
Depends on this Interview Conversation between assistant and user,
Give me feedback for user Interview. Give me rating out of 10 for technical Skills,
Communication, Problem Solving, Experience and totalRating. Also give me summery in 4 lines 
about the interview and one line to let me know whether is recommended
for hire or not with msg. Give me response in JSON format
{
  feedback:{
    rating:{
      technicalSkills:<number between 1-10>,
      communication:<number between 1-10>,
      ProblemSolving:<number between 1-10>,
      experience:<number between 1-10>,
      totalRating:<number between 1-10>
    },
    summery:<in 4 Line>,
    Recommendation:",
    RecommendationMsg:"
  }
} `