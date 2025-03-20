"use client";
import { useState, useEffect } from "react";
import { getUserStories } from "@/app/actions";
import { type User, type Story } from "@/types/types";
import Sidebar from "../home/sidebar";
import HomeHeader from "../home/homeheader";
import StoryChatPage from "./storychatarea";
export default function StoryContainer({
  userObject,
  storyid,
}: {
  userObject: User;
  storyid: string;
}) {
  const [stories, setStories] = useState<Story[]>([]);

  useEffect(() => {
    const fetchStories = async () => {
      const fetchedStories = await getUserStories();
      if (fetchedStories) {
        setStories(fetchedStories); // title is just story for now, we can maybe add a name for the story in the database later
      }
    };

    fetchStories();
  }, []);

  return (
    <>
      <Sidebar userObject={userObject} storyId={storyid} stories={stories} />
      <div className="flex-1 flex flex-col overflow-hidden h-full">
        <HomeHeader />
        <StoryChatPage
          storyID={storyid}
          userObject={userObject}
          setStories={setStories}
        />
      </div>
    </>
  );
}
