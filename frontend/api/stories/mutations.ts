import { fetchApi } from "@/lib/axios";
import { Story, Message, User } from "@/types/types";

type CreateStorySuccess = { success: true; story: Story };
type CreateStoryError = {
  success: false;
  error: { message: string };
  statusCode: number;
};

export type CreateStoryResponse = CreateStorySuccess | CreateStoryError;

export async function createStory(user: User): Promise<CreateStoryResponse> {
  try {
    const response = await fetchApi<Story>("/stories", {
      method: "POST",
      data: {
        user: user,
        name: "New Story",
        messages: [],
      },
    });

    return { success: true, story: response };
  } catch (error) {
    console.error("Error creating story:", error);
    return {
      success: false,
      error: { message: `Could not fetch stories: ${error}` },
      statusCode: 500,
    };
  }
}

export async function createMessage(params: {
  storyID: string;
  role: string;
  content: string;
}): Promise<Message | { error: { message: string }; statusCode: number }> {
  try {
    const response = await fetchApi<Message>("/messages", {
      method: "POST",
      data: {
        story: { id: params.storyID },
        role: params.role,
        content: params.content,
      },
    });

    return response;
  } catch (error) {
    console.error("Error creating message:", error);
    return {
      error: {
        message: `Could not fetch message: ${error}`,
      },
      statusCode: 500,
    };
  }
}

export async function updateName(params: {
  storyID: string;
  name: string;
}): Promise<Story | { error: { message: string }; statusCode: number }> {
  try {
    const response = await fetchApi<Story>(`/stories/${params.storyID}`, {
      method: "PUT",
      data: {
        name: params.name,
      },
    });
    return response;
  } catch (error) {
    console.error("Error updating story name:", error);
    return {
      error: {
        message: `Could not update story name: ${error}`,
      },
      statusCode: 500,
    };
  }
}

export const deleteStory = async (
  storyId: string
): Promise<boolean | { error: { message: string }; statusCode: number }> => {
  try {
    const response = await fetchApi(`/stories/${storyId}`, {
      method: "DELETE",
    });

    return true;
  } catch (error) {
    console.error("Error deleting story:", error);
    return {
      error: {
        message: `Could not delete story: ${error}`,
      },
      statusCode: 500,
    };
  }
};
