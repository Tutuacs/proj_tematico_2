"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ButtonLogout() {
  const router = useRouter();

  async function logout() {
    await signOut({
      redirect: false,
    });

    router.push("/");
  }

  return (
    <button
      onClick={logout}
      className="w-40 p-2 border border-gray-300 rounded-md hover:bg-red-600 transition-colors"
    >
      Sair
    </button>
  );
}
