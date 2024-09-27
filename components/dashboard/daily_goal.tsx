"use client";
import React from "react";
import { CardContent, CardHeader, CardTitle } from "../ui/card";
import { BarChart2 } from "lucide-react";
import { useEffect, useState } from "react";
import { getUser } from "@/utils/supabase/update_info";
import {
  getSessionsForLast7Days,
  getTasksBySessionIds,
} from "@/utils/supabase/dailyGoal";

type TaskDetails = {
  start_time: string;
  end_time: string;
  session_id: string;
};

export default function DailyGoal() {
  useEffect(() => {
    const fetchData = async () => {
      const data = await getUser();
      if (!data?.id) return;

      const userSessions = await getSessionsForLast7Days(data?.id);
      if (!userSessions) return;
      const getSessionIds = userSessions?.map((session) => session.id);

      const tasks = await getTasksBySessionIds(getSessionIds);
      if (!tasks) return;
      setTasks(tasks);
    };

    fetchData();
  }, []);

  const [task, setTasks] = useState<TaskDetails[]>([]);

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
            7
          </span>
          <span className="text-sm text-[#c4a484] dark:text-[#1d2d35]">
            day streak
          </span>
        </div>
      </CardContent>
    </div>
  );
}
