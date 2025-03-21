import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import * as React from "react";
import { getUser } from "@/api/queries";
import { User } from "@/types/types";
import StoryContainer from "@/components/stories/storycontainer";

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
      <StoryContainer
        userObject={userObject}
        storyid={storyid}
        userId={user.id}
      />
    </div>
  );
}
