"use client";

import { signUpAction, signInAction } from "@/utils/supabase/supabase.actions";
import { SubmitButton } from "@/components/submit-button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import OAuthButtons from "./OAuthButtons";
import { useSearchParams } from "next/navigation";

interface AuthFormType {
  type: "Sign In" | "Sign Up";
}

export const AuthForm: React.FC<AuthFormType> = ({ type }) => {
  const searchParams = useSearchParams();
  const isSignUp = type === "Sign Up";

  const message = searchParams?.get("message");

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f2e9de] p-4">
      <Card className="flex flex-col justify-between gap-4 md:min-w-[500px] md:min-h-[560px] p-8 bg-[#1d2d35] text-[#f2e9de] border-[#c4a484] shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">
            {isSignUp ? "Sign up for StudyPace" : "Sign in to StudyPace"}
          </h1>
          <p className="text-sm text-[#f2e9de] opacity-80 mt-1">
            {isSignUp
              ? "Create an account to get started"
              : "Welcome back! Please sign in."}
          </p>
        </div>

        <div className="flex-1 mt-5">
          <form className="space-y-4">
            <div>
              <Label htmlFor="email" className="block text-sm font-medium mb-1">
                Email address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                className="w-full bg-[#2a3b47] border-[#c4a484] text-[#f2e9de] placeholder-[#f2e9de] placeholder-opacity-50"
              />
            </div>
            <div>
              <Label
                htmlFor="password"
                className="block text-sm font-medium mb-1"
              >
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder={
                  isSignUp ? "Create a password" : "Enter your password"
                }
                required
                minLength={6}
                className="w-full bg-[#2a3b47] border-[#c4a484] text-[#f2e9de] placeholder-[#f2e9de] placeholder-opacity-50"
              />
            </div>
            <SubmitButton
              pendingText={isSignUp ? "Signing Up..." : "Signing In..."}
              formAction={isSignUp ? signUpAction : signInAction}
              className="w-full bg-[#c4a484] text-[#1d2d35] hover:bg-[#a18769] py-2 rounded-md transition-colors"
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </SubmitButton>
          </form>

          {/* Social login buttons */}
          <div className="flex flex-row justify-center gap-2">
            <OAuthButtons />
          </div>
        </div>

        {/* Custom Error message if there exists one */}
        {message && (
          <p className="text-sm md:text-base text-center font-medium text-red-600">
            {message}
          </p>
        )}

        <div className="text-center text-sm">
          <span className="text-[#f2e9de] opacity-80">
            {isSignUp ? "Already have an account? " : "Don't have an account? "}
          </span>
          <Link
            href={isSignUp ? "/sign-in" : "/sign-up"}
            className="text-[#c4a484] hover:underline"
          >
            {isSignUp ? "Sign in" : "Sign up"}
          </Link>
        </div>

        <div className="text-center text-xs text-[#f2e9de] opacity-60">
          Secured by the Study Pace Team
        </div>
      </Card>
    </div>
  );
};
