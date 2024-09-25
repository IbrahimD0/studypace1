import React from "react";
import { Card } from "@/components/ui/card";
import ProductivityStats from "@/components/dashboard/productivity_stats";
import RecentTopics from "@/components/dashboard/recent_topics";
import WeeklyOverview from "@/components/dashboard/weekly_overview";
import DailyGoal from "@/components/dashboard/daily_goal";
import CurrentSession from "@/components/dashboard/current_session";
import NavBar from "@/components/navbar";
import { LockedCard } from "@/components/LockedCard";

export default function Dashboard() {
  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-[#f2e9de] p-8 font-sans">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Maybe run a for loop to make the grid? or that might be a bit fancy lol */}

          <Card className="bg-[#1d2d35] text-[#f9f4e8] col-span-full lg:col-span-1">
            <CurrentSession />
          </Card>

          <LockedCard>
            <DailyGoal />
          </LockedCard>

          <LockedCard>
            <WeeklyOverview />
          </LockedCard>

          <LockedCard>
            <RecentTopics />
          </LockedCard>

          <LockedCard>
            <ProductivityStats />
          </LockedCard>
        </div>
      </div>
    </>
  );
}
