"use client";

import type React from "react";
import HomeHero from "@/components/home/homehero";
import { createStory } from "@/api/stories/mutations";
import { Button } from "../ui/button";
import { User } from "@/types/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Particles from "../ui/particles";

export default function HomeChatArea({
  username,
  userObject,
}: {
  username: string;
  userObject: User;
}) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const onCreateStory = async () => {
    try {
      setLoading(true);
      const newStory = await createStory(userObject);
      console.log("Story created successfully");
      if (newStory.success && newStory.story) {
        router.push(`/stories/${newStory.story.id}`);
      }
    } catch (error) {
      console.error("Error creating story:", error);
      return {
        error: {
          message: `Error creating story: ${error}`,
        },
        statusCode: 500,
      };
    }
  };

  return (
    <>
      <div className="h-screen flex flex-col p-4 overflow-hidden max-h-screen">
        <Particles
          className="absolute inset-0 -z-10 animate-fade-in"
          quantity={300}
        />
        <HomeHero username={username} />
        <Button onClick={() => onCreateStory()}>
          {loading ? "Loading..." : "Create a Story"}
        </Button>
      </div>
    </>
  );
}
