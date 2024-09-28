import React from "react";
import { Card } from "@/components/ui/card";
import CurrentSession from "./dashboard/Current_Session_Stuff/CurrentSession";
import { LockedCard } from "@/components/LockedCard";
import { User } from "@supabase/supabase-js";
import { DashboardConent } from "@/lib/constants";
import Navbar from "./navbar";

interface HomePageProps {
  isLoggedIn: boolean;
  userId: User["id"] | null;
}

const HomePage: React.FC<HomePageProps> = ({ isLoggedIn, userId }) => {
  return (
    <>
      {" "}
      <Navbar /> {/* Add the Nav component here */}
      <div className="min-h-screen bg-[#f2e9de] p-8 font-sans">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-[#1d2d35] text-[#f9f4e8] col-span-full lg:col-span-1">
            <CurrentSession />
          </Card>

          {isLoggedIn
            ? DashboardConent.map(({ id, component: Component }) => (
                <Card key={id}>
                  <Component userId={userId as string} />
                </Card>
              ))
            : DashboardConent.map(({ id, component: Component }) => (
                <LockedCard key={id}>
                  <Component />
                </LockedCard>
              ))}
        </div>
      </div>{" "}
    </>
  );
};

export default HomePage;
