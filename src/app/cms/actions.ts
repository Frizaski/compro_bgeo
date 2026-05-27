"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CMS_ACCESS_COOKIE, CMS_ACCESS_LIFETIME_SECONDS } from "@/lib/cms-session";
import { createClient } from "@/lib/supabase/server";

export async function loginCms(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error || !data.user) {
    redirect("/cms?error=invalid");
  }

  const { data: profile } = await supabase
    .from("admin_profiles")
    .select("user_id")
    .eq("user_id", data.user.id)
    .eq("role", "admin")
    .maybeSingle();

  if (!profile) {
    await supabase.auth.signOut();
    redirect("/cms?error=unauthorized");
  }

  const cookieStore = await cookies();
  cookieStore.set(CMS_ACCESS_COOKIE, "active", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: CMS_ACCESS_LIFETIME_SECONDS,
    path: "/cms",
  });

  revalidatePath("/cms", "page");
  redirect("/cms");
}

export async function logoutCms() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  const cookieStore = await cookies();
  cookieStore.delete(CMS_ACCESS_COOKIE);
  revalidatePath("/cms", "page");
  redirect("/cms");
}
