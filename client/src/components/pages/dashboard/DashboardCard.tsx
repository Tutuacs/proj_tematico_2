import Link from "next/link";

type DashboardCardProps = {
  /** título do card */
  title: string;
  /** número (apenas para cards de estatística) */
  value?: number | string;
  /** destino do click (opcional) */
  href?: string;
  /** callback opcional se preferir usar onClick em vez de href */
  onClick?: () => void;
  /** aparência do card */
  variant?: "stat" | "muted" | "dark";
  /** tamanho do padding (ajuda a diferenciar stat x action) */
  size?: "sm" | "lg";
  /** classes extras (opcional) */
  className?: string;
  /** altura fixa para cards de ação (Tailwind) */
  actionHeightClass?: string; // default: "h-[120px]"
};

export default function DashboardCard({
  title,
  value,
  href,
  onClick,
  variant = "stat",
  size = "sm",
  className,
  actionHeightClass = "h-[120px]",
}: DashboardCardProps) {
  const base =
    "rounded-xl border shadow transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500";

  const byVariant: Record<NonNullable<typeof variant>, string> = {
    stat: "bg-white border-gray-200 hover:shadow-md text-left",
    muted: "bg-gray-300 text-white hover:bg-gray-400 text-center",
    dark: "bg-gray-900 text-white hover:bg-gray-800 text-center",
  };

  const bySize: Record<NonNullable<typeof size>, string> = {
    sm: "p-5",
    lg: "p-8",
  };

  const isAction = variant !== "stat";

  const card =
    isAction ? (
      <div
        className={[
          base,
          byVariant[variant],
          bySize[size],
          actionHeightClass, 
          "flex items-center justify-center",
          className ?? "",
        ].join(" ")}
      >
        <p className="text-xl font-semibold leading-snug text-center">{title}</p>
      </div>
    ) : (
      <div className={[base, byVariant[variant], bySize[size], className ?? ""].join(" ")}>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-3xl font-bold text-indigo-600">{value}</p>
      </div>
    );

  if (href) return <Link href={href} className="block" aria-label={title}>{card}</Link>;
  if (onClick) return <button type="button" onClick={onClick} className="w-full text-left">{card}</button>;
  return card;
}