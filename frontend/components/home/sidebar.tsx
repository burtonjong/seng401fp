'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ListFilter, Menu, Plus, LogOut } from "lucide-react";
import { signOutAction } from "@/app/actions";
import { getUserDetails, getUserStories, deleteStory } from "@/app/actions";
import { createStory } from "@/api/stories/mutations";
import { useStories } from "@/contexts/StoryContext"; // Import the context hook
import { Story } from "@/types/types";

export const createStoryForUser = async (
  setStories: React.Dispatch<React.SetStateAction<Story[]>>
) => {
  const user = await getUserDetails();
  if (user) {
    try {
      const newStory = await createStory({ user });
      console.log("Story created successfully");

<<<<<<< HEAD
      if (newStory.success && newStory.story) {
        setStories((prevStories: Story[]) => [
          ...prevStories,
          {
            id: newStory.story.id,
            title: "Story",
            user: newStory.story.user,
            created_at: newStory.story.created_at,
          }, // title is just story for now, we can maybe add a name for the story in the database later
=======
      if ("id" in newStory) {
        setStories((prevStories: Story[]) => [
          ...prevStories,
          { id: newStory.id, title: "Story", created_at: new Date().toISOString(), user: user.id },
>>>>>>> 4c9646cfe14407a51f76f3425c5ddf75c5b0d947
        ]);
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
<<<<<<< HEAD
  const [stories, setStories] = useState<Story[]>([]);
=======
  const { stories, setStories } = useStories(); // Access stories and setStories from context
>>>>>>> 4c9646cfe14407a51f76f3425c5ddf75c5b0d947

  useEffect(() => {
    const fetchStories = async () => {
      const fetchedStories = await getUserStories();
      if (fetchedStories) {
<<<<<<< HEAD
        setStories(fetchedStories); // title is just story for now, we can maybe add a name for the story in the database later
=======
        setStories(
          fetchedStories.map((story) => ({
            id: story.id,
            title: "Story",
            created_at: story.created_at,
            user: story.user,
          }))
        );
>>>>>>> 4c9646cfe14407a51f76f3425c5ddf75c5b0d947
      }
    };

    fetchStories();
<<<<<<< HEAD
  }, []);

  const handleDeleteStory = async (storyId: string) => {
    const success = await deleteStory(storyId);
    if (success) {
      setStories((prevStories) =>
        prevStories.filter((story) => story.id !== storyId)
      );
=======
  }, [setStories]); // Make sure to include setStories in the dependency array

  const handleDeleteStory = async (storyId: string) => {
    const success = await deleteStory(storyId); 
    if (success) {
      setStories((prevStories) => prevStories.filter((story) => story.id !== storyId));
>>>>>>> 4c9646cfe14407a51f76f3425c5ddf75c5b0d947
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
<<<<<<< HEAD
                onClick={() => handleSwitchStory({ storyID: story.id })}
=======
>>>>>>> 4c9646cfe14407a51f76f3425c5ddf75c5b0d947
              >
                <ListFilter className="h-5 w-5 flex-shrink-0" />
                {sidebarOpen && (
                  <span className="truncate text-left">{story.title}</span>
                )}
              </Button>
              <button
                className="ml-2 text-white hover:text-white"
<<<<<<< HEAD
                onClick={() => handleDeleteStory(story.id)}
=======
                onClick={() => handleDeleteStory(story.id)} 
>>>>>>> 4c9646cfe14407a51f76f3425c5ddf75c5b0d947
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
<<<<<<< HEAD
        <Button
          variant="ghost"
          className={`w-full justify-start gap-3 py-2 text-[#e0e0e0] hover:bg-[#2a2a2a] relative ${!sidebarOpen && "justify-center"}`}
          onClick={handleProfile}
        >
          <User className="h-5 w-5" />
          {sidebarOpen && <span>Profile</span>}
        </Button>
=======
>>>>>>> 4c9646cfe14407a51f76f3425c5ddf75c5b0d947
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
