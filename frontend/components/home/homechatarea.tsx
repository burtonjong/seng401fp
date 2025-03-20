"use client";

import type React from "react";
import HomeHero from "@/components/home/homehero";
import { createStory } from "@/api/stories/mutations";
import { Button } from "../ui/button";
import { User } from "@/types/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react"

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
    <div className="min-h-screen flex flex-col items-center justify-center p-6 md:p-8 lg:p-12 overflow-hidden">
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center">
        <HomeHero username={username} />

        <Button
          onClick={onCreateStory}
          disabled={loading}
          size="lg"
          className="w-full md:w-auto px-8 py-6 text-lg font-medium rounded-xl bg-white text-gray-800 hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 border border-gray-200"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin text-gray-800" />
              Creating your story...
            </span>
          ) : (
            <span className="flex items-center gap-2">Create a Story</span>
          )}
        </Button>
      </div>
    </div>
  );
}
