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
        <DialogTrigger className="p-3 rounded-2xl font-medium text-md bg-[#c4a484] text-[#1d2d35] hover:bg-[#a18769]">
          Start Session
        </DialogTrigger>{" "}
      </CardContent>

      {/* Pop Up dialog, like a modal */}
      <DialogContent
        className="bg-secondary"
        aria-labelledby="dialog-title" // Adding aria-labelledby
        aria-describedby="dialog-description" // Adding aria-describedby
      >
        <DialogHeader>
          <DialogTitle id="dialog-title">Are you absolutely sure?</DialogTitle>
          <DialogDescription id="dialog-description">
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>

        {/* Dummy information just so we can see what it looks like */}
        <div className="mt-4">
          <p className="text-lg">Session Tracking Information:</p>
          <ul className="list-disc list-inside">
            <li>Start Time: 10:00 AM</li>
            <li>End Time: 11:00 AM</li>
            <li>Duration: 1 hour</li>
            <li>Focus: High</li>
            <li>Notes: Completed the first chapter of the book.</li>
          </ul>
        </div>

        {/* Buttons to handle different functionalities */}
        <div className="flex justify-end gap-3 mt-10">
          <Button onClick={handleCancel} variant="destructive">
            Cancel
          </Button>{" "}
          <Button onClick={handleSubmit} variant="default">
            Start
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
