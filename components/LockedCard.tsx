import React from "react";
import { Card } from "./ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Lock } from "lucide-react";

// Component to display a card with a lock icon and a tooltip
export const LockedCard = ({ children }: { children: React.ReactNode }) => (
  <Card className="relative bg-[#f9f4e8] shadow-md">
    {children}
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="absolute bottom-2 right-2 bg-[#1d2d35] rounded-full p-1.5">
            <Lock className="w-3 h-3 text-[#f9f4e8]" />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Unavailable: User not signed in</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </Card>
);
