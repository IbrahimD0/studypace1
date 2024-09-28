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
};

const OAuthButtons = () => {
  const oAuthProviders: OAuthProvider[] = [
    {
      id: 1,
      name: "github",
      displayName: "GitHub",
      icon: "/github.png",
    },
    {
      id: 2,
      name: "google",
      displayName: "Google",
      icon: "/google.png",
    },
  ];
  return (
    <>
      {oAuthProviders.map((provider) => (
        <Button
          variant={"default"}
          onClick={async () => await oAuthSignIn(provider.name)}
          key={provider.id}
          className="mt-2 flex items-center justify-center gap-2"
        >
          <Image
            src={provider?.icon as string}
            width={23}
            height={23}
            alt={`${provider.displayName} image`}
          />
          {provider.displayName}
        </Button>
      ))}
    </>
  );
};

export default OAuthButtons;
