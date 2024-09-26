"use client";

import React from "react";
import { CardContent, CardHeader, CardTitle } from "../ui/card";
import { Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import StartStudySession from "../start_session/start_session";

const handleSubmit = () => {
  console.log("Submit button clicked");
};

const handleCancel = () => {
  console.log("Cancel button clicked");
};

export default function CurrentSession() {
  return (
    <Dialog>
      <CardHeader>
        <CardTitle className="text-lg font-medium flex items-center">
          <Clock className="w-5 h-5 mr-2" />
          Current Session
        </CardTitle>
      </CardHeader>
      <CardContent>
        <h2 className="text-3xl font-bold mb-4">No Active Session</h2>
        <DialogTrigger className="p-2 rounded-lg font-medium text-md bg-[#c4a484] text-[#1d2d35] hover:bg-[#a18769]">
          Start Session
        </DialogTrigger>{" "}
      </CardContent>

      {/* Pop Up dialog, like a modal */}
      <DialogContent className="max-w-4xl w-11/12 max-h-[90vh] overflow-y-auto bg-[#f2e8dc]">

        {/* Dummy information just so we can see what it looks like */}
        <StartStudySession />

        
      </DialogContent>
    </Dialog>
  );
}
