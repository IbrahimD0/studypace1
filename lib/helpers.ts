import { TaskDetails } from "@/components/dashboard/daily_goal";

export const calculateStreak = (tasks: TaskDetails[]): number => {
  let streak = 0;
  let currentDate = new Date().toISOString().split("T")[0];

  for (let i = 0; i < tasks.length; i++) {
    const taskDate = tasks[i].created_at.split("T")[0];

    // if current day is equal to task created day
    if (currentDate === taskDate) {
      streak++;

      // move current day back by 1

      currentDate = new Date(
        new Date(currentDate).getTime() - 24 * 60 * 60 * 1000
      )
        .toISOString()
        .split("T")[0]; // Only keep the date part, exclude time
    } else {
      break;
    }
  }

  return streak;
};
