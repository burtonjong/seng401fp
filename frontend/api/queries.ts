
import { type User, Message, Story } from "@/types/types";
import { fetchApi } from "@/lib/axios";

export async function getUser(userId: string): Promise<User> {
  const response = await fetchApi<User>(`/users/${userId}`, {
    method: "GET",
  });
  return response;
}

export async function getMessage(messageId: string): Promise<Message> {
    const response = await fetchApi<Message>(`/message/${messageId}`, {
      method: "GET",
});
    return response;
  }

export async function getStory(storyId: string): Promise<Story> {
    const response = await fetchApi<Story>(`/story/${storyId}`, {
      method: "GET",
    });
    return response;
  }

export async function getAllMessages(): Promise<Message[]> {
    const response = await fetchApi<Message[]>('/messages', {
      method: 'GET',
    });
    return response;
  }
  
export async function getAllStories(): Promise<Story[]> {
    const response = await fetchApi<Story[]>('/stories', {
      method: 'GET',
    });
    return response;
  }