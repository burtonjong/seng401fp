"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Edit, Save, Calendar, Mail } from "lucide-react";
import { useState } from "react";
import { type User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";

export default function UserDetails({
  user,
  username,
}: {
  user: User;
  username: string;
}) {
  const supabaseClient = createClient();
  const [isEditing, setIsEditing] = useState(false);
  const [usernameState, setUsername] = useState(username);

  const handleSave = async () => {
    try {
      const { error } = await supabaseClient
        .from("users")
        .update({ username: usernameState })
        .eq("id", user.id);

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error("Error updating username:", error);
    }

    setIsEditing(false);
  };

  console.log(username);

  const parsedDate = new Date(user.created_at).toDateString();

  return (
    <Card className="md:col-span-1 flex flex-col justify-center items-center w-1/2">
      <CardHeader className="flex flex-col items-center text-center pb-2">
        <CardDescription>
          {isEditing ? (
            <div className="flex items-center gap-2 ">
              <CardTitle>
                <Input
                  value={usernameState}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-8"
                />
              </CardTitle>
              <Button size="sm" onClick={handleSave} variant="outline">
                <Save className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <CardTitle className="text-xl">{usernameState}</CardTitle>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsEditing(true)}
                className="h-6 w-6 p-0"
              >
                <Edit className="h-3 w-3" />
              </Button>
            </div>
          )}
        </CardDescription>
      </CardHeader>
      <div className="border-t border-b border-[#2a2a2a] w-1/3" />
      <CardContent className="text-center p-2">
        <div className="flex items-center justify-center gap-1  text-sm text-muted-foreground">
          <Mail className="h-3 w-3" />
          <span> {user.email}</span>
        </div>
      </CardContent>
      <CardContent className="text-center">
        <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
          <Calendar className="h-3 w-3" />
          <span>Joined {parsedDate}</span>
        </div>
      </CardContent>
    </Card>
  );
}
