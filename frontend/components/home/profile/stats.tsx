import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "@/types/types";
import { Clock, Book } from "lucide-react";
import Achievements from "./achievements";

export default function Stats({
  userData,
  createdAt,
  userId,
}: {
  userData: User;
  createdAt: string;
  userId: string;
}) {
  const daysSinceJoined = Math.floor(
    (new Date().getTime() - new Date(createdAt).getTime()) / (1000 * 3600 * 24)
  );

  const stats = [
    { icon: Book, label: "Stories Created", value: userData?.stories?.length },
    {
      icon: Clock,
      label: "Days Since You Joined",
      value: daysSinceJoined,
    },
  ];

  return (
    <Card className="w-full md:col-span-2">
      <CardHeader>
        <CardTitle>Profile Statistics</CardTitle>
        <CardDescription>Your activity and engagement metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-4 border rounded-lg"
            >
              <stat.icon className="h-8 w-8 mb-2 text-primary" />
              <h3 className="text-2xl font-bold">{stat.value}</h3>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
          <Achievements userId={userId} />
        </div>
      </CardContent>
    </Card>
  );
}
