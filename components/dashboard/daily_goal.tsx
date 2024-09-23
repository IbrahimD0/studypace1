import React from "react";
import { CardContent, CardHeader, CardTitle } from "../ui/card";
import { BarChart2 } from "lucide-react";

export default function DailyGoal() {
  return (
    <div>
      <CardHeader>
        <CardTitle className="text-lg font-medium flex items-center">
          <BarChart2 className="w-5 h-5 mr-2" />
          Daily Goal
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-2 bg-[#e5dcc3] rounded-full mb-2">
          <div
            className="h-full bg-[#c4a484] rounded-full"
            style={{ width: "75%" }}
          ></div>
        </div>
        <p className="text-sm mb-4">3 hours 45 minutes / 5 hours</p>
        <div className="flex items-baseline">
          <span className="text-3xl font-bold mr-2">7</span>
          <span className="text-sm">day streak</span>
        </div>
      </CardContent>
    </div>
  );
}
