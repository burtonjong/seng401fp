"use client";

import Sidebar from "@/components/home/sidebar";
import HomeChatArea from "@/components/home/homechatarea";
import HomeHeader from "@/components/home/homeheader";
import { Story, User } from "@/types/types";
import { useEffect, useState } from "react";
import { getUserStories } from "@/api/queries";

export default function HomeContainer({
  userObject,
  username,
  userId,
}: {
  userObject: User;
  username: string;
  userId: string;
}) {
  const [stories, setStories] = useState<Story[]>([]);

  useEffect(() => {
    const fetchStories = async () => {
      const fetchedStories = (await getUserStories(userId)) as Story[];
      if (fetchedStories) {
        setStories(fetchedStories); // title is just story for now, we can maybe add a name for the story in the database later
      }
    };

    fetchStories();
  }, []);
  return (
    <>
      <Sidebar
        userObject={userObject}
        stories={stories}
        setStories={setStories}
      />
      <div className="flex-1 flex flex-col overflow-hidden h-full">
        <HomeHeader />
        <HomeChatArea userObject={userObject} username={username} />
      </div>
    </>
  );
}
