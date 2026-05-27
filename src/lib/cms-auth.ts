import { cookies } from "next/headers";
import { CMS_ACCESS_COOKIE } from "@/lib/cms-session";
import { createClient } from "@/lib/supabase/server";

export interface CmsAdmin {
  userId: string;
  fullName: string;
  role: string;
}

export async function getCmsAdmin(): Promise<CmsAdmin | null> {
  if (!(await cookies()).has(CMS_ACCESS_COOKIE)) {
    return null;
  }

  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();

  if (!authData.user) {
    return null;
  }

  const { data: profile } = await supabase
    .from("admin_profiles")
    .select("user_id, full_name, role")
    .eq("user_id", authData.user.id)
    .eq("role", "admin")
    .maybeSingle();

  if (!profile) {
    return null;
  }

  return {
    userId: profile.user_id,
    fullName: profile.full_name,
    role: profile.role,
  };
}

export async function requireCmsAdmin() {
  const admin = await getCmsAdmin();

  if (!admin) {
    throw new Error("Unauthorized CMS request.");
  }

  return admin;
}
