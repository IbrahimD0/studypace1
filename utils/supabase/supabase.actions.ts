"use server";

import { Provider } from "@supabase/supabase-js";
import { createClient } from "./server";
import { redirect } from "next/navigation";
import { getURL } from "@/lib/helpers";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { encodedRedirect } from "../utils";
const supabase = createClient();

// This function is used on the server side to handle OAuth sign-ins
export const oAuthSignIn = async (provider: Provider) => {
  if (!provider) return redirect("/sign-in?message=Provider not found");

  // the get url function will get the current url weather it is localhost or production
  // then passes the auth callback as argument
  // example: http://localhost:3000/auth/callback
  const redirectUrl = getURL("/auth/callback");
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: redirectUrl,
    },
  });

  if (error) redirect("/sign-in?message=Error signing in with OAuth");
  return redirect(data.url);
};

// Handles the sign-up process, including email and password validation, and user creation
export const signUpAction = async (formData: FormData) => {
  const supabase = createClient();

  const email = formData.get("email")?.toString() as string;
  const password = formData.get("password")?.toString() as string;
  const origin = headers().get("origin");

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    redirect("/sign-up?message=Could Not Sign you in");
  }

  revalidatePath("/", "layout");
  redirect("/sign-in?message=Check your email to verify your account");
};

// Handles user sign-in by verifying email and password credentials
export const signInAction = async (formData: FormData) => {
  const supabase = createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/sign-in?message=Could Not Authenticate User");
  }

  revalidatePath("/", "layout");
  redirect("/protected");
};

// Handles password reset requests by sending a reset link to the user's email
export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = createClient();
  const origin = headers().get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password"
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password."
  );
};

// Resets the user's password after validation of the new password and confirmation
export const resetPasswordAction = async (formData: FormData) => {
  const supabase = createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required"
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Passwords do not match"
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password update failed"
    );
  }

  encodedRedirect("success", "/protected/reset-password", "Password updated");
};

// Logs out the current user and redirects to the sign-in page
export const signOutAction = async () => {
  const supabase = createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};
