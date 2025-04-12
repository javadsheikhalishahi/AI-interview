import DashboardProvider from "./provider";

function DashboardLayout ({ children }) {
  return (
    <div className="bg-gradient-to-r from-white via-sky-50 to-teal-50">
        <DashboardProvider>
          <div className="p-6">
            {children}
          </div>
            
        </DashboardProvider>
    </div>
  )
}

export default DashboardLayout;