"use client";
import { useEffect, useState } from "react";
import {
  BookOpen,
  Bell,
  User,
  LogOut,
  Settings,
  HelpCircle,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { signOutAction } from "@/app/actions";
import UserMenu from "./user_menu";
import { createClient } from "@/utils/supabase/client";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const supabase = createClient();

    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <nav className="bg-[#1d2d35] text-[#f2e9de] p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center">
          <BookOpen className="mr-2" />
          EarthTones
        </h1>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-[#000000] transition-colors">
            <Bell size={20} />
          </button>
          <div>
            {user ? (
              <>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      className="p-2 rounded-full hover:bg-[#000000] transition-colors"
                    >
                      <User size={20} />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56 bg-[#1d2d35] text-[#f2e9de] border-[#c4a484]">
                    <UserMenu />
                  </PopoverContent>
                </Popover>
              </>
            ) : (
              <>
                <Link href="/sign-in">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link href="/sign-up">
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
