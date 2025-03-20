import { fetchApi } from "@/lib/axios";
import { Story, UserDetails, Message } from "@/types/types";

type CreateStorySuccess = { success: true; story: Story };
type CreateStoryError = {
  success: false;
  error: { message: string };
  statusCode: number;
};

export type CreateStoryResponse = CreateStorySuccess | CreateStoryError;

export async function createStory(params: {
  user: UserDetails;
}): Promise<CreateStoryResponse> {
  try {
    const response = await fetchApi<Story>("/stories", {
      method: "POST",
      data: {
        user: {
          id: params.user.id,
          username: params.user.username,
          email: params.user.email,
        },
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
