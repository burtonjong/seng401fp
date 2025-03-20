import { type User, Message, Story, Achievement } from "@/types/types";
import { fetchApi } from "@/lib/axios";

export async function getUser(
  userId: string
): Promise<User | { error: { message: string }; statusCode: number }> {
  try {
    const response = await fetchApi<User>(`/users/${userId}`, {
      method: "GET",
    });
    return response;
  } catch (error) {
    console.error("Error fetching user:", error);
    return {
      error: {
        message: `User could not be found: ${error}`,
      },
      statusCode: 404,
    };
  }
}

export async function getMessage(
  messageId: string
): Promise<Message | { error: { message: string }; statusCode: number }> {
  try {
    const response = await fetchApi<Message>(`/message/${messageId}`, {
      method: "GET",
    });
    return response;
  } catch (error) {
    console.error("Error fetching message:", error);
    return {
      error: {
        message: `Message could not be found: ${error}`,
      },
      statusCode: 404,
    };
  }
}

export async function getStory(
  storyId: string
): Promise<Story | { error: { message: string }; statusCode: number }> {
  try {
    const response = await fetchApi<Story>(`/story/${storyId}`, {
      method: "GET",
    });
    return response;
  } catch (error) {
    console.error("Error fetching story:", error);
    return {
      error: {
        message: `Story could not be found: ${error}`,
      },
      statusCode: 404,
    };
  }
}

export async function getAllMessages(): Promise<
  Message[] | { error: { message: string }; statusCode: number }
> {
  try {
    const response = await fetchApi<Message[]>("/messages", {
      method: "GET",
    });
    return response;
  } catch (error) {
    console.error("Error fetching messages:", error);
    return {
      error: {
        message: `Could not fetch messages: ${error}`,
      },
      statusCode: 500,
    };
  }
}

export async function getAllStories(): Promise<
  Story[] | { error: { message: string }; statusCode: number }
> {
  try {
    const response = await fetchApi<Story[]>("/stories", {
      method: "GET",
    });
    return response;
  } catch (error) {
    console.error("Error fetching stories:", error);
    return {
      error: {
        message: `Could not fetch stories: ${error}`,
      },
      statusCode: 500,
    };
  }
}

export async function getUserAchievements(
	userId: string
): Promise<Achievement[] | { error: { message: string }; statusCode: number }> {
	try {
		const response = await fetchApi<Achievement[]>(
			`/api/achievements/${userId}`,
			{
				method: "GET",
			}
		);
		return response;
	} catch (error) {
		console.error("Error fetching achievements:", error);
		return {
			error: {
				message: `Could not fetch achievements: ${error}`,
			},
			statusCode: 500,
		};
	}
}

export async function checkUserAchievement(
	userId: string,
	achievementName: string
): Promise<
	| { exists: boolean; achievement?: Achievement }
	| { error: { message: string }; statusCode: number }
> {
	try {
		const response = await fetchApi<{
			exists: boolean;
			achievement?: Achievement;
		}>(
			`/api/achievements/${userId}/check?achievement=${encodeURIComponent(achievementName)}`,
			{ method: "GET" }
		);
		return response;
	} catch (error) {
		console.error("Error checking achievement:", error);
		return {
			error: {
				message: `Could not check achievement: ${error}`,
			},
			statusCode: 500,
		};
	}
}
