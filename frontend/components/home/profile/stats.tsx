import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock, Book } from "lucide-react";

export default function Stats({
  storiesLength,
  createdAt,
}: {
  storiesLength: number;
  createdAt: string;
}) {
  const stats = [
    { icon: Book, label: "Stories", value: storiesLength },
    { icon: Clock, label: "Time", value: createdAt },
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
