import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Sidebar from "@/components/home/sidebar";
import HomeHeader from "@/components/home/homeheader";
import StoryChatPage from "@/components/stories/storychatarea";

type Props = {
  params: { storyid: string };
};

export default async function StoryPage({ params }: Props) {
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
      <div className="flex-1 flex flex-col overflow-hidden h-full">
        <HomeHeader />
        <StoryChatPage storyID={params.storyid} />
      </div>
    </div>
  );
}
