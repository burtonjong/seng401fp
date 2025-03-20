import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { getUsername } from "../actions";
import { getUser } from "@/api/queries";
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

  const username = await getUsername();
  const userId = user.id;

  const userObject = (await getUser(userId)) as User;

  return (
    <div className="fixed inset-0 flex bg-black text-white">
      <HomeContainer userObject={userObject} username={username} />
    </div>
  );
}
