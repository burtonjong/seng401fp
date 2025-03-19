import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, MessageSquare } from "lucide-react";

export default function Stats() {
  // stats
  // amount of stories created
  // time since account creation

  // optional for later
  // amount of messages sent
  const stats = [
    { icon: MessageSquare, label: "Posts", value: "248" },
    { icon: Users, label: "Followers", value: "1,024" },
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
        </div>
      </CardContent>
    </Card>
  );
}
