"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ListFilter, Menu, Plus, LogOut, User2, Trash2, AlertCircle } from "lucide-react"
import { signOutAction } from "@/app/actions"
import { getUserStories, deleteStory } from "@/app/actions"
import { createStory } from "@/api/stories/mutations"
import { useRouter } from "next/navigation"
import type { Story, User } from "@/types/types"

export default function Sidebar({
  userObject,
  storyId,
}: {
  userObject: User
  storyId?: string
}) {
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [storyToDelete, setStoryToDelete] = useState<Story | null>(null)

  const handleProfile = () => {
    router.push("/home/profile")
  }

  const handleSwitchStory = (params: { storyID: string }) => {
    router.push(`/stories/${params.storyID}`)
  }

  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [stories, setStories] = useState<Story[]>([])

  useEffect(() => {
    const fetchStories = async () => {
      const fetchedStories = await getUserStories()
      if (fetchedStories) {
        setStories(fetchedStories)
      }
    }

    fetchStories()
  }, [])

  const openDeleteModal = (story: Story) => {
    setStoryToDelete(story)
    setShowDeleteModal(true)
  }

  const closeDeleteModal = () => {
    setShowDeleteModal(false)
    setStoryToDelete(null)
  }

  const confirmDeleteStory = async () => {
    if (!storyToDelete) return

    setDeleting(true)
    const success = await deleteStory(storyToDelete.id)
    if (success) {
      setStories((prevStories) => prevStories.filter((story) => story.id !== storyToDelete.id))
      setDeleting(false)
      closeDeleteModal()
      router.push(`/home`)
    } else {
      setDeleting(false)
    }
  }

  const createStoryForUser = async (user: User) => {
    try {
      setLoading(true)
      const newStory = await createStory(user)
      console.log("Story created successfully")
      if (newStory.success && newStory.story) {
        router.push(`/stories/${newStory.story.id}`)
      }
    } catch (error) {
      console.error("Error creating story:", error)
      setLoading(false)
      return {
        error: {
          message: `Error creating story: ${error}`,
        },
        statusCode: 500,
      }
    }
  }

  return (
    <>
      <div
        className={`${sidebarOpen ? "w-[344px]" : "w-20"} flex-shrink-0 bg-[#0f0f0f] border-r border-[#2a2a2a] flex flex-col overflow-hidden transition-all duration-300`}
      >
        <div className="p-4">
          <Button variant="ghost" size="icon" className="h-10 w-10" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        <div className="px-4 py-2">
          <Button
            variant="ghost"
            className={`w-full justify-start gap-3 rounded-full bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white ${!sidebarOpen && "justify-center"}`}
            onClick={() => createStoryForUser(userObject)}
            disabled={loading}
          >
            {loading ? (
              <span className="animate-spin">
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </span>
            ) : (
              <Plus className="h-5 w-5" />
            )}
            {sidebarOpen && <span>{loading ? "Creating story..." : "New chat"}</span>}
          </Button>
        </div>

        <div className="mt-6 px-4">
          <h3 className={`text-sm font-medium mb-2 ${!sidebarOpen && "hidden"}`}>Recent</h3>
          {stories.length > 0 ? (
            stories.map((story) => (
              <div key={story.id} className="flex items-center justify-between mb-1">
                <Button
                  variant="ghost"
                  className={`w-full justify-start gap-3 py-2 text-[#e0e0e0] hover:bg-[#2a2a2a] ${!sidebarOpen && "justify-center"} ${story.id === storyId && "bg-[#2a2a2a] text-white"}`}
                  onClick={() => handleSwitchStory({ storyID: story.id })}
                >
                  <ListFilter className="h-5 w-5 flex-shrink-0" />
                  {sidebarOpen && <span className="truncate text-left">{story.name}</span>}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-gray-500 hover:text-red-400"
                  onClick={() => openDeleteModal(story)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))
          ) : (
            <p className={`text-[#666] ${!sidebarOpen && "hidden"}`}>No stories yet</p>
          )}
        </div>

        <div className="mt-auto px-4 py-4 space-y-1">
          <Button
            variant="ghost"
            className={`w-full justify-start gap-3 py-2 text-[#e0e0e0] hover:bg-[#2a2a2a] relative ${!sidebarOpen && "justify-center"}`}
            onClick={handleProfile}
          >
            <User2 className="h-5 w-5" />
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

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1a1a] rounded-lg shadow-xl max-w-md w-full p-6 border border-[#2a2a2a]">
            <div className="flex items-start mb-4">
              <div className="mr-3 text-red-500 flex-shrink-0">
                <AlertCircle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Delete Story</h3>
                <p className="text-gray-400">
                  Are you sure you want to delete "{storyToDelete?.name}"? This action cannot be undone.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button
                variant="outline"
                className="border-[#2a2a2a] hover:bg-[#2a2a2a] text-white"
                onClick={closeDeleteModal}
                disabled={deleting}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                className="bg-red-600 hover:bg-red-700"
                onClick={confirmDeleteStory}
                disabled={deleting}
              >
                {deleting ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin h-4 w-4 border-2 border-white border-opacity-20 border-t-white rounded-full"></span>
                    Deleting...
                  </span>
                ) : (
                  "Delete"
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

