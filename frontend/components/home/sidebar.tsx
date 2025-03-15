"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Clock,
  HelpCircle,
  ListFilter,
  Menu,
  Plus,
  Settings,
} from "lucide-react";

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <div
      className={`${sidebarOpen ? "w-[344px]" : "w-20"} flex-shrink-0 bg-[#0f0f0f] border-r border-[#2a2a2a] flex flex-col overflow-hidden transition-all duration-300`}
    >
      <div className="p-4">
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      <div className="px-4 py-2">
        <Button
          variant="ghost"
          className={`w-full justify-start gap-3 rounded-full bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white ${!sidebarOpen && "justify-center"}`}
        >
          <Plus className="h-5 w-5" />
          {sidebarOpen && <span>New chat</span>}
        </Button>
      </div>

      <div className="mt-6 px-4">
        <h3 className={`text-sm font-medium mb-2 ${!sidebarOpen && "hidden"}`}>
          Recent
        </h3>
        <Button
          variant="ghost"
          className={`w-full justify-start gap-3 py-2 text-[#e0e0e0] hover:bg-[#2a2a2a] ${!sidebarOpen && "justify-center"}`}
        >
          <ListFilter className="h-5 w-5 flex-shrink-0" />
          {sidebarOpen && (
            <span className="truncate text-left">Example Story 1</span>
          )}
        </Button>
      </div>

      <div className="mt-auto px-4 py-4 space-y-1">
        <Button
          variant="ghost"
          className={`w-full justify-start gap-3 py-2 text-[#e0e0e0] hover:bg-[#2a2a2a] relative ${!sidebarOpen && "justify-center"}`}
        >
          <HelpCircle className="h-5 w-5" />
          {sidebarOpen && <span>Help</span>}
        </Button>
        <Button
          variant="ghost"
          className={`w-full justify-start gap-3 py-2 text-[#e0e0e0] hover:bg-[#2a2a2a] ${!sidebarOpen && "justify-center"}`}
        >
          <Clock className="h-5 w-5" />
          {sidebarOpen && <span>Activity</span>}
        </Button>
        <Button
          variant="ghost"
          className={`w-full justify-start gap-3 py-2 text-[#e0e0e0] hover:bg-[#2a2a2a] relative ${!sidebarOpen && "justify-center"}`}
        >
          <Settings className="h-5 w-5" />
          {sidebarOpen && <span>Settings</span>}
        </Button>
      </div>
    </div>
  );
}
