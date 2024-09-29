"use client";

import React, { useState, useEffect } from "react";
import { CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Clock } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../../ui/button";
import StartStudySession from "./StartSession";

export default function CurrentSession() {
  const [hasActiveSession, setHasActiveSession] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    // Check if there's an active session in localStorage
    const storedSession = localStorage.getItem("currentSession");
    setHasActiveSession(!!storedSession);
  }, [hasActiveSession, open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <CardHeader>
        <CardTitle className="text-lg font-medium flex items-center ">
          <Clock className="w-5 h-5 mr-2" />
          Current Session
        </CardTitle>
      </CardHeader>
      <CardContent>
        {hasActiveSession ? (
          <>
            <h2 className="text-3xl font-bold mb-4">
              Active Session in Progress
            </h2>
            <DialogTrigger asChild>
              <Button className="p-2 rounded-lg font-medium text-md bg-[#c4a484] text-[#1d2d35] hover:bg-[#a18769]">
                View Current Session
              </Button>
            </DialogTrigger>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold mb-4">No Active Session</h2>
            <DialogTrigger asChild>
              <Button className="p-2 rounded-lg font-medium text-md bg-[#c4a484] text-[#1d2d35] hover:bg-[#a18769]">
                Start Session
              </Button>
            </DialogTrigger>
          </>
        )}
      </CardContent>

      <DialogContent className="max-h-[90vh] overflow-auto bg-[#f2e8dc]">
        <StartStudySession />
      </DialogContent>
    </Dialog>
  );
}
