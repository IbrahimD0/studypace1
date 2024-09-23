import React from "react";
import { CardContent, CardHeader, CardTitle } from "../ui/card";
import { Clock } from "lucide-react";
import { Button } from "../ui/button";

export default function CurrentSession() {
  return (
    <div>
      <CardHeader>
        <CardTitle className="text-lg font-medium flex items-center">
          <Clock className="w-5 h-5 mr-2" />
          Current Session
        </CardTitle>
      </CardHeader>
      <CardContent>
        <h2 className="text-3xl font-bold mb-4">No Active Session</h2>
        <Button className="bg-[#c4a484] text-[#1d2d35] hover:bg-[#a18769]">
          Start Session
        </Button>
      </CardContent>
    </div>
  );
}
