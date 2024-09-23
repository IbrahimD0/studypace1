import React from "react";
import { CardContent, CardHeader, CardTitle } from "../ui/card";
import { BookOpen } from "lucide-react";

export default function RecentTopics() {
  return (
    <div>
      <CardHeader>
        <CardTitle className="text-lg font-medium flex items-center">
          <BookOpen className="w-5 h-5 mr-2" />
          Recent Topics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {[
            "Ancient Civilizations",
            "Environmental Science",
            "World Literature",
            "Quantum Physics",
            "Art History",
          ].map((topic, index) => (
            <li key={index} className="flex items-center">
              <span className="w-2 h-2 rounded-full bg-[#3d3024] mr-2"></span>
              {topic}
            </li>
          ))}
        </ul>
      </CardContent>
    </div>
  );
}
