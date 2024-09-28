import React from "react";
import HomePage from "@/components/HomePage";
import { createClient } from "@/utils/supabase/server";

const Dashboard = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      {user !== null ? (
        <HomePage isLoggedIn={true} userId={user.id as string} />
      ) : (
        <HomePage isLoggedIn={false} userId={null} />
      )}
    </>
  );
};

export default Dashboard;
