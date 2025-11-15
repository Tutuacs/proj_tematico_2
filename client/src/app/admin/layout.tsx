import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { redirect } from "next/navigation";
import AdminNavbar from "@/components/AdminNavbar";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const session = await getServerSession(authOptions);

  // Check if user is authenticated and is an admin
  if (!session?.profile?.id) {
    redirect("/login");
  }

  // Only allow admin (role 2) to access
  if (session.profile.role !== 2) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar session={session} />
      {children}
    </div>
  );
}
