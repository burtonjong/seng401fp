"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

interface AchievementsProps {
	userId: string;
}

export default function Achievements({ userId }: AchievementsProps) {
	const [achievements, setAchievements] = useState<string[]>([]);

	useEffect(() => {
		async function fetchAchievements() {
			const supabase = await createClient();
			const { data: userAchievements, error } = await supabase
				.from("achievements")
				.select("achievement")
				.eq("user_id", userId);

			if (error) {
				console.error("Error fetching achievements:", error);
				return;
			}

			setAchievements(userAchievements.map((ach) => ach.achievement));
		}

		fetchAchievements();
	}, [userId]);

	return (
		<div className="flex flex-col items-center p-4 border rounded-lg">
			<h2 className="text-2xl font-bold mb-4">Achievements</h2>
			<ul className="list-disc list-inside">
				{achievements.map((achievement, index) => (
					<li key={index}>{achievement}</li>
				))}
			</ul>
		</div>
	);
}
