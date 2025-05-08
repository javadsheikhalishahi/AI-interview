import { LayoutDashboard } from "lucide-react";
import CreateOptions from "./_components/CreateOptions";
import LatestInterviewsList from "./_components/LatestInterviewsList";
import Welcome from "./_components/Welcome";

function Dashboard() {
  return (
    <div>
      <Welcome />
      <h2 className="text-4xl font-extrabold text-gray-900 my-6 mx-1 p-3 pt-6 flex items-center gap-3">
        <LayoutDashboard className="text-indigo-500 w-7 h-7" />
        Dashboard
      </h2>
      <CreateOptions />
      <LatestInterviewsList />
    </div>
  );
}

export default Dashboard;
