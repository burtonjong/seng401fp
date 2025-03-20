import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Sidebar from "@/components/home/sidebar";
import HomeHeader from "@/components/home/homeheader";
import StoryChatPage from "@/components/stories/storychatarea";
import * as React from "react";
import { getUser } from "@/api/queries";
import { User } from "@/types/types";

export default async function StoryPage({
  params,
}: {
  params: Promise<{ storyid: string }>;
}) {
  const supabase = createClient();

  const storyid = (await params).storyid;

  const {
    data: { user },
  } = await (await supabase).auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  const userId = user.id;

  const userObject = (await getUser(userId)) as User;

  return (
    <div className="fixed inset-0 flex bg-black text-white">
      <Sidebar userObject={userObject} storyId={storyid} />
      <div className="flex-1 flex flex-col overflow-hidden h-full">
        <HomeHeader />
        <StoryChatPage storyID={storyid} userObject={userObject} />
      </div>
    </div>
  );
}
