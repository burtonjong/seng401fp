import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { getUser, getUsername } from "@/api/queries";
import { User } from "@/types/types";
import HomeContainer from "@/components/home/homecontainer";

export default async function Main() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const username = (await getUsername(user.id)) as string;

  const userObject = (await getUser(user.id)) as User;

  return (
    <div className="fixed inset-0 flex bg-black text-white">
      <HomeContainer
        userObject={userObject}
        username={username}
        userId={user.id}
      />
    </div>
  );
}
