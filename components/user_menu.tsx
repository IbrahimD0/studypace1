"use client";

import React from "react";
import { Button } from "./ui/button";
import { HelpCircle, LogOut, Settings, User } from "lucide-react";
import { signOutAction } from "@/utils/supabase/supabase.actions";

export default function UserMenu() {
  return (
    <div>
      <div className="grid gap-4">
        {/* todo: Add the users name here instead of plain text */}
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

          {/* Server action from below to log the user out */}
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
