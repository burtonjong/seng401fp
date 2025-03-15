import { Plus } from "lucide-react";
import { Button } from "../ui/button";

export default function HomeChatArea() {
  return (
    <div className="p-4 flex justify-center">
      <div className="relative w-full max-w-3xl">
        <div className="flex items-center rounded-full border border-[#444] bg-[#1e1e1e] px-4 py-3">
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
            <Plus className="h-5 w-5" />
          </Button>
          <input
            type="text"
            placeholder="Start an Odyssey"
            className="flex-1 bg-transparent border-none outline-none px-3 text-white placeholder-gray-400"
          />
        </div>
      </div>
    </div>
  );
}
