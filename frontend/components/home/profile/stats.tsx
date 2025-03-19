import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User, Users, MessageSquare, Award } from "lucide-react";

export default function Stats() {
    // stats
    // amount of stories created
    // time since account creation
    
    // optional for later
    // amount of messages sent
  const stats = [
    { icon: MessageSquare, label: "Posts", value: "248" },
    { icon: Users, label: "Followers", value: "1,024" },
    { icon: User, label: "Following", value: "364" },
    { icon: Award, label: "Achievements", value: "12" },
  ];
  return (
    <Card className="md:col-span-2">
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

        <div className="space-y-4">
          <h3 className="font-medium">Activity Overview</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">Profile Completion</span>
              <span className="text-sm font-medium">85%</span>
            </div>
            <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
              <div
                className="bg-primary h-full rounded-full"
                style={{ width: "85%" }}
              ></div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">Weekly Activity</span>
              <span className="text-sm font-medium">High</span>
            </div>
            <div className="flex gap-1 h-10">
              {[40, 65, 30, 80, 55, 45, 70].map((height, i) => (
                <div key={i} className="flex-1 flex items-end">
                  <div
                    className="w-full bg-primary/80 rounded-sm"
                    style={{ height: `${height}%` }}
                  ></div>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
