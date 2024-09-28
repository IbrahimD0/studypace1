"use client";
import { createClient } from "@/utils/supabase/client";
import { CardContent, CardHeader, CardTitle } from "../ui/card";
import { BookOpen } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { getUser } from "@/utils/supabase/update_info";


const supabase = createClient();
export default function RecentTopics() {
  const [topics, setTopics] = useState<string[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser();
      if (user) {
        setUserId(user.id);
      }
    };
    fetchUser();
  }, []);
  console.log("User ID", userId);
  const generateTopics = useCallback(async (tasks: string[])  => {
    try {
      const res = await fetch("/api/recentTopics", {
        method: "POST",
        body: JSON.stringify({ tasks }),
      })

      if (!res.ok){
        throw new Error("Failed to generate topics")
      }

      const data = await res.json();
      console.log(data);
      console.log("tea", JSON.parse(data.choices[0]?.message?.content))
      const content = JSON.parse(data.choices[0]?.message?.content);

      setTopics(content.topics);
      console.log("type topic", typeof(topics))
    } catch (error) {
      console.error(error)
    }
  }, []);

  const fetchTasks = useCallback(async () => {
    if (!userId) return;
    console.log("testing");
    console.log(userId);

    try {
      const now = new Date();
      const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
      startOfWeek.setHours(0, 0, 0, 0);
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(endOfWeek.getDate() + 7);
      const { data: tasks, error } = await supabase
        .from("Task")
        .select("content, Session (user_id)")
        .eq("Session.user_id", userId)
        .gte("created_at", startOfWeek.toISOString())
        .lt("created_at", endOfWeek.toISOString());

      if (error) {
        console.log("Failed to fetch tasks", error);
      }
      const validTasks = tasks?.filter((task) => task.Session !== null);
      const taskContents = validTasks?.map((task) => task.content);
      console.log("Tasks", validTasks);
      console.log("Tasks1", taskContents);
      await generateTopics(taskContents || []);
    } catch (error) {
      console.error("Error fetching tasks", error);
    }
  }, [userId]);

  const handleTaskChange = useCallback(() => {
    console.log("Task change");
    fetchTasks();
  }, [fetchTasks]);

  useEffect(() => {
    if (userId) {
      fetchTasks();

      const subscription = supabase.channel("Task").on("postgres_changes", {event: "INSERT", schema: "public", table: "Task"}, handleTaskChange).subscribe();
      return () => {
        subscription.unsubscribe();
      }
      
    }
  }, [userId, fetchTasks, handleTaskChange]);

  return (
    <div>
      <CardHeader>
        <CardTitle className="text-lg font-medium flex items-center">
          <BookOpen className="w-5 h-5 mr-2" />
          Recent Topics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {topics.map((topic, index) => (
            <li key={index} className="flex items-center">
              <span className="w-2 h-2 rounded-full bg-[#3d3024] mr-2"></span>
              {topic}
            </li>
          ))}
        </ul>
      </CardContent>
    </div>
  );
}
