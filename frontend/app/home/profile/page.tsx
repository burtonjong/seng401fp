import { getUser, getUsername } from "@/api/queries";
import Stats from "@/components/home/profile/stats";
import UserDetails from "@/components/home/profile/userdetails";
import { Button } from "@/components/ui/button";
import Particles from "@/components/ui/particles";
import { User } from "@/types/types";
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

  const username = (await getUsername(user.id)) as string;

  // scuffed but its ok
  const userData = (await getUser(user.id)) as User;

  return (
    <div className="container mx-auto py-8 px-4 w-[75dvw] flex items-center flex-col">
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={1000}
      />
      <div className="flex flex-row justify-between w-1/2 mb-4 items-center ">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <Button>
          <Link href="/home">
            <span>Return to Home</span>
          </Link>
        </Button>
      </div>

      <div className="flex flex-col items-center w-full gap-4">
        <UserDetails user={user} username={username} />
        <Stats userData={userData} createdAt={user.created_at} userId={user.id} />
      </div>
    </div>
  );
}
