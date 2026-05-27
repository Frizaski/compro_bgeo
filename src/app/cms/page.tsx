import type { Metadata } from "next";
import { LockKeyhole } from "lucide-react";
import CmsDashboard from "@/components/cms/CmsDashboard";
import { loginCms } from "@/app/cms/actions";
import { getCmsAdmin } from "@/lib/cms-auth";
import { getInvoices } from "@/lib/invoices";
import { getSiteContent } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "CMS Admin | BGEO DEV",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function CmsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const admin = await getCmsAdmin();

  if (admin) {
    const [content, invoices] = await Promise.all([getSiteContent(), getInvoices()]);
    return <CmsDashboard adminName={admin.fullName} initialContent={content} initialInvoices={invoices} />;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--background)] px-6 text-[var(--foreground)]">
      <section className="w-full max-w-md rounded-3xl border border-black/10 bg-white p-8 shadow-xl dark:border-white/10 dark:bg-white/5 md:p-10">
        <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--primary-green)] to-[var(--primary-blue)] text-white">
          <LockKeyhole size={27} />
        </div>
        <p className="text-xs font-bold uppercase tracking-[0.35em] text-[var(--primary-green)]">BGEO Admin</p>
        <h1 className="mt-4 text-3xl font-bold">CMS Access</h1>
        <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          Sign in to manage website content and create invoices.
        </p>

        <form action={loginCms} className="mt-8 space-y-4">
          <label className="block text-sm font-medium" htmlFor="email">
            Admin email
          </label>
          <input
            suppressHydrationWarning
            id="email"
            name="email"
            type="email"
            required
            autoComplete="username"
            className="w-full rounded-xl border border-black/10 bg-transparent px-4 py-3 outline-none transition focus:border-[var(--primary-blue)] dark:border-white/15"
          />
          <label className="block text-sm font-medium" htmlFor="password">
            Password
          </label>
            <input
              suppressHydrationWarning
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full rounded-xl border border-black/10 bg-transparent px-4 py-3 outline-none transition focus:border-[var(--primary-blue)] dark:border-white/15"
            />
            {params.error === "invalid" && (
              <p className="text-sm text-red-500">Email atau password tidak benar.</p>
            )}
            {params.error === "unauthorized" && (
              <p className="text-sm text-red-500">Akun ini belum terdaftar sebagai admin.</p>
            )}
            <button
              suppressHydrationWarning
              type="submit"
              className="w-full rounded-xl bg-[var(--foreground)] px-5 py-3 font-semibold text-[var(--background)] transition-transform hover:-translate-y-0.5"
            >
              Enter Dashboard
            </button>
        </form>
      </section>
    </main>
  );
}
