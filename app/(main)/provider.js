import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/AppSidebar";

function DashboardProvider({ children }) {
  return (
    <div>
        <SidebarProvider>
            <AppSidebar />
            <div>
                <SidebarTrigger  />
               {children} 
            </div>
        </SidebarProvider>
    </div>
  )
}

export default DashboardProvider;
