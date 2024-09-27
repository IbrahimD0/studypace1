"use client";
import React, { useEffect, useState } from "react";
import { CardContent, CardHeader, CardTitle } from "../ui/card";
import { BarChart2 } from "lucide-react";
import { getUser } from "@/utils/supabase/update_info";
import {
  getSessionsForLast7Days,
  getTasksBySessionIds,
} from "@/utils/supabase/dailyGoal";
import { calculateStreak } from "@/lib/helpers";

export type TaskDetails = {
  start_time: string;
  end_time: string;
  created_at: string;
  session_id: string;
};

export default function DailyGoal() {
  const [task, setTasks] = useState<TaskDetails[]>([]);
  const [streak, setStreak] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch the user info
      const data = await getUser();
      if (!data?.id) return;

      // Fetch sessions for the last 7 days based on user ID
      const userSessions = await getSessionsForLast7Days(data?.id);
      if (!userSessions) return;
      const getSessionIds = userSessions?.map((session) => session.id);

      // Fetch tasks based on session IDs
      const tasks = await getTasksBySessionIds(getSessionIds);
      if (!tasks) return;

      // Update state with tasks
      setTasks(tasks);

      // Calculate the streak based on the fetched tasks and update the streak state
      const streakValue = calculateStreak(task); // Pass tasks to calculateStreak
      setStreak(streakValue);
    };

    fetchData();
  }, [task]); // Only run the effect once when the component mounts

  console.log(task);

  return (
    <div>
      <CardHeader>
        <CardTitle className="text-lg font-medium flex items-center text-[#c4a484] dark:text-[#1d2d35]">
          <BarChart2 className="w-5 h-5 mr-2" />
          Daily Goal
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-2 bg-[#e5dcc3] rounded-full mb-2">
          {/* progress bar */}
          <div
            className="h-full bg-[#c4a484] rounded-full"
            style={{ width: "75%" }}
          ></div>
        </div>

        {/* how much the user actually studied for divided by how much they planned to study for */}
        <p className="text-sm mb-4 text-[#c4a484] dark:text-[#1d2d35]">
          3 hours 45 minutes / 5 hours
        </p>
        <div className="flex items-baseline">
          <span className="text-3xl font-bold mr-2 text-[#c4a484] dark:text-[#1d2d35]">
            {streak}
          </span>
          <span className="text-sm text-[#c4a484] dark:text-[#1d2d35]">
            day streak
          </span>
        </div>
      </CardContent>
    </div>
  );
}
