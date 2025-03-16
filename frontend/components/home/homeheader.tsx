"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { signOutAction } from "@/app/actions";

export default function HomeHeader() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <header className="flex items-center justify-between px-4 py-2 border-b border-[#2a2a2a]">
      <div className="flex items-center">
        <span className="text-xl font-medium">Endless Odyssey</span>
      </div>

      <div className="flex items-center gap-2 relative">
        <Button
          className="w-12 h-12 rounded-full bg-purple-700 flex items-center justify-center text-white font-medium text-xl"
          onClick={toggleDropdown}
        >
          X
        </Button>

        {isDropdownOpen && (
          <div className="absolute top-12 right-0 w-48 bg-white shadow-lg rounded-md border border-gray-200">
            <div className="flex flex-col">
              <Button
                className="w-full text-left px-6 py-3 text-lg hover:bg-gray-200"
                // onClick={handleSettings} // TODO Add handleSettings function if we have anything for it, if not you can remove
              >
                Settings
              </Button>
              <Button
                className="w-full text-left px-6 py-3 text-lg hover:bg-gray-200"
                onClick={() => signOutAction()}
              >
                Logout
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
