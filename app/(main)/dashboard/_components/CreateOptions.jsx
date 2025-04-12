import { PhoneCall, Video } from "lucide-react"

function CreateOptions() {
  return (
    <div className="grid grid-cols-2 gap-4 p-1">
      <div className="bg-white rounded-2xl border border-gray-200 p-5">
        <Video className="w-12 h-12 text-blue-600 p-3 bg-blue-50 rounded-2xl" /> 
        <h2 className="font-bold pt-2">Create New Interview</h2>
        <p className="text-gray-500">Build interviews with AI and manage candidate scheduling with ease</p>
      </div>
      <div className="bg-white rounded-2xl border border-gray-200 p-5">
        <PhoneCall className="w-12 h-12 text-blue-600 p-3 bg-blue-50 rounded-2xl" /> 
        <h2 className="font-bold pt-2">Set Up a Phone Screening Interview</h2>
        <p className="text-gray-500">Plan and schedule phone interviews with candidates</p>
      </div>
    </div>
  )
}

export default CreateOptions
