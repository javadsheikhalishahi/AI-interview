import CreateOptions from "./_components/CreateOptions";
import LatestInterviewsList from "./_components/LatestInterviewsList";
import Welcome from "./_components/Welcome";

function Dashboard() {
  return (
    <div>
      <Welcome />
      <h2 className="text-2xl font-bold my-3 mx-1 p-2 pt-3">Dashboard</h2>
      <CreateOptions />
      <LatestInterviewsList />
    </div>
  )
}

export default Dashboard;
