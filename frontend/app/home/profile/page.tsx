import { getUsername } from "@/app/actions";
import Stats from "@/components/home/profile/stats";
import UserDetails from "@/components/home/profile/userdetails";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const username = await getUsername();

  return (
    <div className="container mx-auto py-8 px-4 w-[75dvw]">
      <div className="flex flex-row justify-between mb-4 items-center ">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <Button>
          <Link href="/home">
            <span>Return to Home</span>
          </Link>
        </Button>
      </div>

      <div className="flex flex-col w-full gap-4">
        <UserDetails user={user} username={username} />
        <Stats />
      </div>
    </div>
  );
}
