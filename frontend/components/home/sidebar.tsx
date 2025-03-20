"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

import { ListFilter, Menu, Plus, LogOut, User } from "lucide-react";

import { signOutAction } from "@/app/actions";
import { getUserDetails, getUserStories, deleteStory } from "@/app/actions";
import { createStory } from "@/api/stories/mutations";
import { useRouter } from "next/navigation";
import { Story } from "@/types/types";
import { createClient } from "@/utils/supabase/client";

export const createStoryForUser = async (
  setStories: React.Dispatch<React.SetStateAction<Story[]>>
) => {
  const user = await getUserDetails();
  if (user) {
    try {
      const newStory = await createStory({ user });
      console.log("Story created successfully");

      if (newStory.success && newStory.story) {
        setStories((prevStories: Story[]) => [
          ...prevStories,
          {
            id: newStory.story.id,
            user: newStory.story.user,
            created_at: newStory.story.created_at,
            name: "Story",
          }, // title is just story for now, we can maybe add a name for the story in the database later
        ]);
      }

      // Check if user has created 5 stories for an achievement
      const supabase = await createClient();
      const { data: stories, error } = await supabase
        .from("stories")
        .select("*")
        .eq("user_id", user.id);

      if (error) {
        console.error("Error fetching stories:", error);
        return;
      }

      console.log("length of stories is", stories.length);
      if (stories.length >= 5) {
        const { error: achievementError } = await supabase
          .from("achievements")
          .insert([{ user_id: user.id, achievement: "Created 5 Stories" }]);

        if (achievementError) {
          console.error("Error adding achievement:", achievementError);
        } else {
          console.log("Achievement added: Created 5 Stories");
        }
      }

      return newStory;
    } catch (error) {
      console.error("Error creating story:", error);
      return {
        error: {
          message: `Error creating story: ${error}`,
        },
        statusCode: 500,
      };
    }
  } else {
    console.error("No user is logged in");
    return {
      error: {
        message: "No user is logged in",
      },
      statusCode: 400,
    };
  }
};

export default function Sidebar() {
  const router = useRouter();

  const handleProfile = () => {
    router.push("/home/profile");
  };

  const handleSwitchStory = (params: { storyID: string }) => {
    router.push(`/stories/${params.storyID}`);
  };

  const handleNewChat = () => {
    router.push("/home");
  };

  const [sidebarOpen, setSidebarOpen] = useState(true);
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

  const handleDeleteStory = async (storyId: string) => {
    const success = await deleteStory(storyId);
    if (success) {
      setStories((prevStories) =>
        prevStories.filter((story) => story.id !== storyId)
      );
    }
  };

  return (
    <div
      className={`${sidebarOpen ? "w-[344px]" : "w-20"} flex-shrink-0 bg-[#0f0f0f] border-r border-[#2a2a2a] flex flex-col overflow-hidden transition-all duration-300`}
    >
      <div className="p-4">
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      <div className="px-4 py-2">
        <Button
          variant="ghost"
          className={`w-full justify-start gap-3 rounded-full bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white ${!sidebarOpen && "justify-center"}`}
          onClick={() => createStoryForUser(setStories)}
        >
          <Plus className="h-5 w-5" />
          {sidebarOpen && <span>New chat</span>}
        </Button>
      </div>

      <div className="mt-6 px-4">
        <h3 className={`text-sm font-medium mb-2 ${!sidebarOpen && "hidden"}`}>
          Recent
        </h3>
        {stories.length > 0 ? (
          stories.map((story) => (
            <div key={story.id} className="flex items-center justify-between">
              <Button
                variant="ghost"
                className={`w-full justify-start gap-3 py-2 text-[#e0e0e0] hover:bg-[#2a2a2a] ${!sidebarOpen && "justify-center"}`}
                onClick={() => handleSwitchStory({ storyID: story.id })}
              >
                <ListFilter className="h-5 w-5 flex-shrink-0" />
                {sidebarOpen && (
                  <span className="truncate text-left">{story.name}</span>
                )}
              </Button>
              <button
                className="ml-2 text-white hover:text-white"
                onClick={() => handleDeleteStory(story.id)}
              >
                <span className="text-xl">&times;</span>
              </button>
            </div>
          ))
        ) : (
          <p className={`text-[#666] ${!sidebarOpen && "hidden"}`}>
            No stories yet
          </p>
        )}
      </div>

      <div className="mt-auto px-4 py-4 space-y-1">
        <Button
          variant="ghost"
          className={`w-full justify-start gap-3 py-2 text-[#e0e0e0] hover:bg-[#2a2a2a] relative ${!sidebarOpen && "justify-center"}`}
          onClick={handleProfile}
        >
          <User className="h-5 w-5" />
          {sidebarOpen && <span>Profile</span>}
        </Button>
        <Button
          variant="ghost"
          className={`w-full justify-start gap-3 py-2 text-[#e0e0e0] hover:bg-[#2a2a2a] relative ${!sidebarOpen && "justify-center"}`}
          onClick={signOutAction}
        >
          <LogOut className="h-5 w-5" />
          {sidebarOpen && <span>Logout</span>}
        </Button>
      </div>
    </div>
  );
}