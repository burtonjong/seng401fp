import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Sidebar from "@/components/home/sidebar";
import HomeHeader from "@/components/home/homeheader";
import HomeHero from "@/components/home/homehero";
import HomeChatArea from "@/components/home/homechatarea";
import { getUsername } from "../actions";

export default async function Main() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const username = await getUsername();

  return (
    <div className="fixed inset-0 flex bg-black text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden h-full">
        <HomeHeader />
        <HomeChatArea username={username} />
      </div>
    </div>
  );
}
