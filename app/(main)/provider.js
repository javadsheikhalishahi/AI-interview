
function DashboardProvider({ children }) {
  return (
    <div>
        <DashboardProvider>
            {children}
        </DashboardProvider>
    </div>
  )
}

export default DashboardProvider;
