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

/**
 * This is not my function!
 * I found it on youtube.
 */
export const getURL = (path: string = "") => {
  // Check if NEXT_PUBLIC_SITE_URL is set and non-empty. Set this to your site URL in production env.
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL &&
    process.env.NEXT_PUBLIC_SITE_URL.trim() !== ""
      ? process.env.NEXT_PUBLIC_SITE_URL
      : // If not set, check for NEXT_PUBLIC_VERCEL_URL, which is automatically set by Vercel.
        process?.env?.NEXT_PUBLIC_VERCEL_URL &&
          process.env.NEXT_PUBLIC_VERCEL_URL.trim() !== ""
        ? process.env.NEXT_PUBLIC_VERCEL_URL
        : // If neither is set, default to localhost for local development.
          "http://localhost:3000/";

  // Trim the URL and remove trailing slash if exists.
  url = url.replace(/\/+$/, "");
  // Make sure to include `https://` when not localhost.
  url = url.includes("http") ? url : `https://${url}`;
  // Ensure path starts without a slash to avoid double slashes in the final URL.
  path = path.replace(/^\/+/, "");

  // Concatenate the URL and the path.
  return path ? `${url}/${path}` : url;
};
