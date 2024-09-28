import React from "react";
import { CardContent, CardHeader, CardTitle } from "../ui/card";
import { Calendar } from "lucide-react";
import { weekDays } from "@/lib/constants";

const WeeklyOverview = ({ userId }: { userId?: string }) => {
  return (
    <div>
      <CardHeader>
        <CardTitle className="text-lg font-medium flex items-center">
          <Calendar className="w-5 h-5 mr-2" />
          Weekly Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between h-24">
          {weekDays.map(({ id, name }) => (
            <div key={id} className="flex flex-col items-center">
              <div
                className="w-6 bg-[#c4a484] rounded-sm"
                style={{ height: `${Math.random() * 100}%` }}
              ></div>
              <span className="mt-2 text-xs">{name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </div>
  );
};
