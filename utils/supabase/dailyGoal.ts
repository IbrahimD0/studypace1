"use server";

import { createClient } from "./server";
const supabase = createClient();

/**
 * Function to fetch users sessions created in the last 7 days
 * and returning data in descending order (newest first)
 */
export const getSessionsForLast7Days = async (userId: string) => {
  const { data, error } = await supabase
    .from("Session")
    .select("id, created_at")
    .eq("user_id", userId)
    .gte(
      "created_at",
      new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    ) // Last 7 days
    .order("created_at", { ascending: false });

  if (error) console.error("Error fetching sessions", error);
  return data;
};

/**
 *  Function to fetch tasks by session IDs which is ultimately passed from above function
 */
export const getTasksBySessionIds = async (sessionIds: string[]) => {
  const { data, error } = await supabase
    .from("Task")
    .select("start_time, end_time, session_id")
    .in("session_id", sessionIds); // Filter tasks by session IDs

  if (error) throw error;
  return data;
};
