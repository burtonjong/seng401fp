import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Sidebar from "@/components/home/sidebar";
import HomeChatArea from "@/components/home/homechatarea";
import { getUsername } from "../actions";
import HomeHeader from "@/components/home/homeheader";
import { getUser } from "@/api/queries";
import { User } from "@/types/types";

export default async function Main() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const username = await getUsername();
  const userId = user.id;

  const userObject = await getUser(userId) as User;

  return (
    <div className="fixed inset-0 flex bg-black text-white">
      <Sidebar userObject={userObject}/>
      <div className="flex-1 flex flex-col overflow-hidden h-full">
        <HomeHeader />
        <HomeChatArea userObject={userObject} username={username} />
      </div>
    </div>
  );
}
