type DashboardCardProps = {
  title: string;
  value: number;
};

export default function DashboardCard({ title, value }: DashboardCardProps) {
  return (
    <div className="flex flex-col justify-center items-start p-5 bg-white rounded-xl border border-gray-200 shadow hover:shadow-md transition">
      <p className="text-sm text-gray-500 mb-1">{title}</p>
      <h2 className="text-3xl font-bold text-indigo-600">{value}</h2>
    </div>
  );
}