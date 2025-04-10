"use client";

import { Button } from "@/components/ui/button";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SideBarOptions } from "@/services/Constants";
import clsx from "clsx";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppSidebar() {
  const path = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="flex p-1 items-center bg-gradient-to-r from-blue-50 via-sky-50 to-cyan-50">
        <Image
          src="/Logo.png"
          alt="Logo"
          width={200}
          height={100}
          className="w-20 object-contain scale-200"
        />
        <Button className="w-[210px] flex items-center justify-center gap-2 py-3 text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-lg shadow-xl transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer animate-buttonEntrance animate-pulseGlow">
          <Plus /> Create New Interview
        </Button>
      </SidebarHeader>

      <SidebarContent className="bg-gradient-to-r from-blue-50 via-sky-50 to-cyan-50 pt-5">
        <SidebarGroup>
          <SidebarMenu>
            {SideBarOptions.map((option, index) => (
              <SidebarMenuItem key={index} className="p-1">
                <SidebarMenuButton
                  asChild
                  className={clsx(
                    "p-5 flex items-center gap-3 transition-all duration-300 ease-in-out transform hover:bg-blue-200 hover:scale-105 rounded-lg",
                    path === option.path && "bg-blue-100"
                  )}
                >
                  <Link href={option.path} className="flex items-center gap-2">
                    <option.icon
                      className={clsx(
                        "transition-transform duration-200 ease-in-out hover:rotate-12",
                        path === option.path && "text-blue-500"
                      )}
                    />
                    <span
                      className={clsx(
                        "text-[16px] font-semibold",
                        path === option.path &&
                          "bg-gradient-to-r from-blue-500 to-indigo-600 text-transparent bg-clip-text",
                        "transition-colors duration-200 ease-in-out hover:text-blue-500"
                      )}
                    >
                      {option.name}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="bg-gradient-to-r from-blue-50 via-sky-50 to-cyan-50 py-5 px-4 border-t border-blue-100">
        <div className="w-full text-center text-sm text-gray-500">
          © 2025{" "}
          <Link
            href="https://www.linkedin.com/in/javad-sheikhalishahi-60094629b/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 font-semibold hover:text-indigo-600 transition-all duration-200 underline underline-offset-4 decoration-blue-300 hover:decoration-indigo-400"
          >
            Javad.Inc
          </Link>{" "}
          · All rights reserved.
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
