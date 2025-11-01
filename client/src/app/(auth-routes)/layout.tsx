import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";

interface PrivateLayoutProps {
  children: React.ReactNode;
}

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  const session = await getServerSession(authOptions);

  // Only redirect if there's a valid session with profile data
  if (session?.profile?.id && session?.profile?.role !== undefined) {
    // Redirect based on role
    const role = session.profile.role;
    if (role === 0) {
      redirect("/trainee/dashboard");
    } else if (role === 1) {
      redirect("/trainer/dashboard");
    } else if (role === 2) {
      redirect("/admin/dashboard");
    } else {
      redirect("/");
    }
  }

  return <>{children}</>;
}
