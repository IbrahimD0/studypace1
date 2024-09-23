"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import React from "react";
import { Button } from "./ui/button";
import { HelpCircle, LogOut, Settings, User } from "lucide-react";
import { signOutAction } from "@/app/actions";
export default function UserMenu() {
  return (
    <div>
      <div className="grid gap-4">
        <div className="font-medium">UserName</div>
        <div className="grid grid-cols-1 gap-2">
          <Button variant="ghost" className="w-full justify-start text-left">
            <User className="mr-2 h-4 w-4" />
            Profile
          </Button>
          <Button variant="ghost" className="w-full justify-start text-left">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Button variant="ghost" className="w-full justify-start text-left">
            <HelpCircle className="mr-2 h-4 w-4" />
            Help
          </Button>
          <form action={signOutAction}>
            <Button
              type="submit"
              variant="ghost"
              className="w-full justify-start text-left text-red-500"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
