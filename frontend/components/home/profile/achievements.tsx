"use client";

import { useEffect, useState } from "react";
import { getUserAchievements } from "@/api/queries";
import { Award } from "lucide-react";
import { Achievement } from "@/types/types";

interface AchievementsProps {
	userId: string;
}

export default function Achievements({ userId }: AchievementsProps) {
	const [achievements, setAchievements] = useState<string[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchAchievements() {
			if (!userId) {
				setError("No user ID provided");
				setLoading(false);
				return;
			}

			setLoading(true);
			try {
				const response = await getUserAchievements(userId);

				if ("error" in response) {
					setError(response.error.message);
					setLoading(false);
					return;
				}

				setAchievements(response.map((ach) => ach.achievement));
				setError(null);
			} catch (err) {
				setError(`Failed to load achievements: ${err}`);
			} finally {
				setLoading(false);
			}
		}

		fetchAchievements();
	}, [userId]);

	return (
		<div className="flex flex-col items-center p-4 border rounded-lg col-span-2">
			<Award className="h-8 w-8 mb-2 text-primary" />
			<h2 className="text-2xl font-bold mb-4">Achievements</h2>

			{loading && <p>Loading achievements...</p>}
			{error && <p className="text-red-500">Error: {error}</p>}

			{!loading &&
				!error &&
				(achievements.length > 0 ? (
					<ul className="list-disc list-inside">
						{achievements.map((achievement, index) => (
							<li key={index} className="my-1">
								{achievement}
							</li>
						))}
					</ul>
				) : (
					<p>No achievements yet. Keep using the app to earn some! Hint: Try creating 5 stories </p>
				))}
		</div>
	);
}
