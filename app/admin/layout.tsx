import Link from "next/link";
import { LayoutDashboard, MessageSquare, FileText, LogOut } from "lucide-react";

export const metadata = { title: "Admin", robots: { index: false, follow: false } };

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-text-secondary transition-colors hover:bg-bg-secondary hover:text-text-primary"
    >
      {children}
    </Link>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`header, footer { display: none !important; }`}</style>
      <div className="flex min-h-screen bg-bg-primary text-text-primary">
      <aside className="hidden w-56 shrink-0 border-r border-border bg-bg-secondary p-4 md:block">
        <p className="mb-6 font-display text-lg font-bold">Admin</p>
        <nav className="flex flex-col gap-1">
          <NavLink href="/admin">
            <LayoutDashboard className="size-4" /> Dashboard
          </NavLink>
          <NavLink href="/admin/posts">
            <FileText className="size-4" /> Posts
          </NavLink>
          <NavLink href="/admin/comments">
            <MessageSquare className="size-4" /> Comments
          </NavLink>
        </nav>
        <div className="mt-auto pt-8">
          <LogoutButton />
        </div>
      </aside>
      <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
    </div>
    </>
  );
}

function LogoutButton() {
  return (
    <form
      action={async () => {
        "use server";
        const { destroySession } = await import("@/lib/auth");
        await destroySession();
        const { redirect } = await import("next/navigation");
        redirect("/admin/login");
      }}
    >
      <button
        type="submit"
        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-text-secondary transition-colors hover:bg-bg-secondary hover:text-danger"
      >
        <LogOut className="size-4" /> Sign out
      </button>
    </form>
  );
}
