'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

type NavItem = { href: string; label: string };

const nav: NavItem[] = [
  { href: '/trainer/trainees',   label: 'Alunos' },
  { href: '/trainer/activities', label: 'Atividades' },
  { href: '/trainer/plans',      label: 'Planos de Treino' },
];

export default function TrainerNavbar() {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + '/');

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/');
  };

  return (
    <nav className="sticky top-0 z-40 w-full bg-slate-900 text-white">
      <div className="flex h-14 w-full items-center justify-between px-6">
        {/* ESQUERDA: logo */}
        <Link
          href="/trainer/dashboard"
          className="grid h-10 w-10 place-items-center rounded-xl bg-slate-200 text-xs font-semibold text-slate-800"
          aria-label="Ir para o Dashboard"
        >
          logo
        </Link>

        {/* DIREITA: CTA + links + sair */}
        <div className="ml-auto flex items-center gap-6">
          <Link
            href="/trainer/reports/new"
            className="rounded-full border border-white/40 bg-white/10 px-4 py-1.5 text-sm backdrop-blur hover:bg-white/20"
          >
            Registrar Avaliação Física
          </Link>

          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`text-sm transition-colors ${
                isActive(n.href)
                  ? 'text-white'
                  : 'text-white/75 hover:text-white'
              }`}
            >
              {n.label}
            </Link>
          ))}

          <button
            onClick={handleLogout}
            aria-label="Sair"
            title="Sair"
            className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <span className="text-lg leading-none">→</span>
          </button>
        </div>
      </div>
      <div className="h-[2px] w-full bg-white/10" />
    </nav>
  );
}