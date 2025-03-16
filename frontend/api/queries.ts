import { type User, Message, Story } from "@/types/types";
import { fetchApi } from "@/lib/axios";

export async function getUser(userId: string): Promise<User | null> {
  try {
    const response = await fetchApi<User>(`/users/${userId}`, {
      method: "GET",
    });
    return response;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

export async function getMessage(messageId: string): Promise<Message | null> {
  try {
    const response = await fetchApi<Message>(`/message/${messageId}`, {
      method: "GET",
    });
    return response;
  } catch (error) {
    console.error("Error fetching message:", error);
    return null;
  }
}

export async function getStory(storyId: string): Promise<Story | null> {
  try {
    const response = await fetchApi<Story>(`/story/${storyId}`, {
      method: "GET",
    });
    return response;
  } catch (error) {
    console.error("Error fetching story:", error);
    return null;
  }
}

export async function getAllMessages(): Promise<Message[] | null> {
  try {
    const response = await fetchApi<Message[]>('/messages', {
      method: 'GET',
    });
    return response;
  } catch (error) {
    console.error("Error fetching all messages:", error);
    return null;
  }
}

export async function getAllStories(): Promise<Story[] | null> {
  try {
    const response = await fetchApi<Story[]>('/stories', {
      method: 'GET',
    });
    return response;
  } catch (error) {
    console.error("Error fetching all stories:", error);
    return null;
  }
}
