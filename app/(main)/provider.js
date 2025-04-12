'use client';

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useState } from "react";
import { AppSidebar } from "./_components/AppSidebar";

function DashboardProvider({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex h-screen">
      <SidebarProvider>
        <AppSidebar className={`sidebar ${isSidebarOpen ? "open" : "closed"}`} />
        <div className="flex-grow p-1">
          <SidebarTrigger
            onClick={handleSidebarToggle}
            className={`sidebar-trigger-button ${isSidebarOpen ? "open" : ""}`}
          />
          {children}
        </div>
      </SidebarProvider>
    </div>
  );
}

export default DashboardProvider;
