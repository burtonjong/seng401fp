import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Sidebar from "@/components/home/sidebar";

export default async function Main() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="fixed inset-0 flex bg-black text-white">
      <Sidebar />
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden h-full">
        {/* Chat area */}
        <div className="flex-1 flex flex-col items-center justify-center p-4 overflow-auto">
          <h1 className="text-4xl font-medium">
            <span className="bg-gradient-to-r from-[var(--gradient-5)] to-[var(--gradient-6)] bg-clip-text text-transparent">
              Hello,
            </span>
            <span className="bg-gradient-to-r from-[var(--gradient-6)] to-[var(--gradient-7)] bg-clip-text text-transparent">
              {" "}
              (Insert Name Here)
            </span>
          </h1>
        </div>

        {/* Input area */}
        <div className="p-4 flex justify-center">
          <div className="relative w-full max-w-3xl">
            <div className="flex items-center rounded-full border border-[#444] bg-[#1e1e1e] px-4 py-3">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
              >
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
      </div>
    </div>
  );
}
