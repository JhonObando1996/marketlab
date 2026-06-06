"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { parseSignInForm, parseSignUpForm } from "@/lib/auth/schemas";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export type AuthActionState = {
  error?: string;
  needsEmailConfirmation?: boolean;
};

function firstValidationError(issues: { message: string }[]): AuthActionState {
  return { error: issues[0]?.message ?? "Invalid form data." };
}

export async function signIn(
  _previousState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = parseSignInForm(formData);

  if (!parsed.success) {
    return firstValidationError(parsed.error.issues);
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/markets");
}

export async function signUp(
  _previousState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = parseSignUpForm(formData);

  if (!parsed.success) {
    return firstValidationError(parsed.error.issues);
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: {
        first_name: parsed.data.firstName,
        last_name: parsed.data.lastName,
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  if (data.session) {
    revalidatePath("/", "layout");
    redirect("/markets");
  }

  return { needsEmailConfirmation: true };
}

export async function signOut() {
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();

  revalidatePath("/", "layout");
  redirect("/markets");
}
