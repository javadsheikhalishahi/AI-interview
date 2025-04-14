import { BriefcaseIcon, CalendarDays, CodeXml, Crown, LayoutDashboardIcon, ListChecks, LucidePuzzle, Settings, UserRound, Wallet2 } from "lucide-react"

export const SideBarOptions = [
    {
        name: 'Dashboard',
        icon: LayoutDashboardIcon,
        path: '/dashboard'
    },
    {
        name: 'Planned Interview',
        icon: CalendarDays,
        path: '/scheduled-interview'
    },
    {
        name: 'All Interview',
        icon: ListChecks,
        path: '/all-interview'
    },
    {
        name: 'Billing',
        icon: Wallet2,
        path: '/billing'
    },
    {
        name: 'Settings',
        icon: Settings,
        path: '/settings'
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