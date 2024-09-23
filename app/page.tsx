import React from "react";
import { Clock, BarChart2, Calendar, BookOpen, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ProductivityStats from "@/components/dashboard/productivity_stats";
import RecentTopics from "@/components/dashboard/recent_topics";
import WeeklyOverview from "@/components/dashboard/weekly_overview";
import DailyGoal from "@/components/dashboard/daily_goal";
import CurrentSession from "@/components/dashboard/current_session";
import NavBar from "@/components/navbar";

const LockedCard = ({ children }: { children: React.ReactNode }) => (
  <Card className="relative bg-[#f9f4e8] shadow-md">
    {children}
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="absolute bottom-2 right-2 bg-[#1d2d35] rounded-full p-1.5">
            <Lock className="w-3 h-3 text-[#f9f4e8]" />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Unavailable: User not signed in</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </Card>
);

export default function Dashboard() {
  return (
    <>
      <NavBar />  
      <div className="min-h-screen bg-[#f2e9de] p-8 font-sans">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
