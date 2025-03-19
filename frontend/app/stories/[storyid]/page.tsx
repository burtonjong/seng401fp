import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Sidebar from "@/components/home/sidebar";
import HomeHeader from "@/components/home/homeheader";
import StoryChatPage from "@/components/stories/storychatarea";
import * as React from 'react'

export default async function StoryPage({params,}: {params: { storyid: string };}) {
  const supabase = createClient();

  const { storyid } = params;

  const { data: { user } } = await (await supabase).auth.getUser();

  if (!user) {
    redirect("/sign-in");
    return null;
  }

  return (
    <div className="fixed inset-0 flex bg-black text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden h-full">
        <HomeHeader />
        <StoryChatPage storyID={storyid} />
      </div>
    </div>
  );
}