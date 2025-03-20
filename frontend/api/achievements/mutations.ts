import { fetchApi } from "@/lib/axios";
import { Achievement } from "@/types/types";

export async function addUserAchievement(
	userId: string,
	achievement: string
): Promise<Achievement | { error: { message: string }; statusCode: number }> {
	try {
		const response = await fetchApi<Achievement>("/api/achievements", {
			method: "POST",
			data: { userId, achievement },
		});
		return response;
	} catch (error) {
		console.error("Error adding achievement:", error);
		return {
			error: {
				message: `Could not add achievement: ${error}`,
			},
			statusCode: 500,
		};
	}
}
