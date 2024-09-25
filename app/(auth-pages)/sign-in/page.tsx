import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function SignIn({ searchParams }: { searchParams: Message }) {
  if ("message" in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center justify-center h-screen sm:max-w-md mx-auto p-4 text-[#f2e9de]">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f2e9de] p-4">
      <Card className="w-[400px] min-h-[500px] p-10 bg-[#1d2d35] text-[#f2e9de] border-[#c4a484] shadow-lg">
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Sign in to StudyPace</h1>
            <p className="text-sm text-[#f2e9de] opacity-80 mt-1">
              Welcome back! Please sign in to continue
            </p>
          </div>

          {/* From Below */}
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
                placeholder="Your password"
                required
                className="w-full bg-[#2a3b47] border-[#c4a484] text-[#f2e9de] placeholder-[#f2e9de] placeholder-opacity-50"
              />
            </div>
            <SubmitButton
              pendingText="Signing In..."
              formAction={signInAction}
              className="w-full bg-[#c4a484] text-[#1d2d35] hover:bg-[#a18769] py-2 rounded-md transition-colors"
            >
              Continue
            </SubmitButton>
          </form>

          <FormMessage message={searchParams} />

          <div className="text-center text-sm">
            <span className="text-[#f2e9de] opacity-80">
              Don&apos;t have an account?{" "}
            </span>
            <Link href="/sign-up" className="text-[#c4a484] hover:underline">
              Sign up
            </Link>
          </div>

          <div className="text-center text-xs text-[#f2e9de] opacity-60">
            Secured by Supabase
          </div>
        </div>
      </Card>
    </div>
  );
}
