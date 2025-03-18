"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ListFilter, Menu, Plus, LogOut } from "lucide-react";

// only if we decide to have settings
// import { Settings } from "lucide-react";

import { signOutAction } from "@/app/actions";
import { getUserDetails } from "@/app/actions";
import { createStory } from "@/api/stories/mutations";


export const createStoryForUser = async () => {
  const user = await getUserDetails();
  if (user) {
    try {
      const newStory = await createStory({ user });
      console.log("Story created successfully");
      return newStory;
    } catch (error) {
      console.error("Error creating story:", error);
      return {
        error: {
          message: `Error creating story: ${error}`,
        },
        statusCode: 500,
      };
    }
  } else {
    console.error("No user is logged in");
    return {
      error: {
        message: "No user is logged in",
      },
      statusCode: 400,
    };
  }
};

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
          onClick={createStoryForUser}
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
        {/* <Button
          variant="ghost"
          className={`w-full justify-start gap-3 py-2 text-[#e0e0e0] hover:bg-[#2a2a2a] relative ${!sidebarOpen && "justify-center"}`}
        >
          <Settings className="h-5 w-5" />
          {sidebarOpen && <span>Settings</span>}
        </Button> */}
        <Button
          variant="ghost"
          className={`w-full justify-start gap-3 py-2 text-[#e0e0e0] hover:bg-[#2a2a2a] relative ${!sidebarOpen && "justify-center"}`}
          onClick={signOutAction}
        >
          <LogOut className="h-5 w-5" />
          {sidebarOpen && <span>Logout</span>}
        </Button>
      </div>
    </div>
  );
}
