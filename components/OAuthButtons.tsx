"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Provider } from "@supabase/supabase-js";
import Image from "next/image";
import { oAuthSignIn } from "@/utils/supabase/supabase.actions";

type OAuthProvider = {
  id: number;
  name: Provider;
  displayName: string;
  icon?: string;
  color: string;
};

const OAuthButtons = () => {
  const oAuthProviders: OAuthProvider[] = [
    {
      id: 1,
      name: "github",
      displayName: "GitHub",
      icon: "/github.svg",
      color: "#000000", // black
    },
    {
      id: 2,
      name: "google",
      displayName: "Google",
      icon: "/google.png",
      color: "#fff", // white
    },
    {
      id: 3,
      name: "discord",
      displayName: "Discord",
      icon: "/discord.png",
      color: "#7289DA", // blue
    },
  ];

  return (
    <>
      {oAuthProviders.map((provider) => (
        <Button
          variant={"default"}
          onClick={async () => await oAuthSignIn(provider.name)}
          key={provider.id}
          className={`mt-2 flex items-center justify-center gap-2 ${provider.name === "github" ? "text-white" : "text-black"}`}
          style={{ backgroundColor: provider.color }} // Inline style for dynamic background color
        >
          <Image
            src={provider?.icon as string}
            width={23}
            height={23}
            alt={`${provider.displayName} icon`}
          />
          {provider.displayName}
        </Button>
      ))}
    </>
  );
};

export default OAuthButtons;
