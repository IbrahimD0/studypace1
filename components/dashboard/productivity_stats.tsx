import React from "react";
import { CardContent, CardHeader, CardTitle } from "../ui/card";
import { BarChart2 } from "lucide-react";

export default function productivity_stats() {
  return (
    <div>
      
      <CardHeader>
        <CardTitle className="text-lg font-medium flex items-center">
          <BarChart2 className="w-5 h-5 mr-2" />
          Productivity Stats
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[
            { label: "Focus Time", value: 85 },
            { label: "Tasks Completed", value: 70 },
            { label: "Efficiency", value: 90 },
          ].map((stat, index) => (
            <div key={index}>
              <div className="flex justify-between mb-1">
                <span>{stat.label}</span>
                <span>{stat.value}%</span>
              </div>
              <div className="h-2 bg-[#e5dcc3] rounded-full">
                <div
                  className="h-full bg-[#3d3024] rounded-full"
                  style={{ width: `${stat.value}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </div>
  );
}
