import Link from "next/link";
import type { Trainee } from "@/lib/types";

export default function TraineeCard({
  trainee,
  onEdit,
  onCreatePlan,
  onCreateReport,
  onViewHistory,
  onViewReports,
}: {
  trainee: Trainee;
  onEdit: () => void;
  onCreatePlan: () => void;
  onCreateReport: () => void;
  onViewHistory: () => void;
  onViewReports: () => void;
}) {
  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 shadow-sm hover:shadow-lg hover:border-indigo-300 transition-all duration-200 overflow-hidden group">
      {/* Header com Avatar */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -ml-12 -mb-12"></div>
        
        <div className="relative flex items-center gap-4">
          {/* Avatar */}
          <div className="bg-white rounded-full p-4 shadow-lg">
            <svg
              className="w-10 h-10 text-indigo-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>

          {/* Nome e Email */}
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-white truncate">
              {trainee.name}
            </h3>
            <p className="text-indigo-100 text-sm truncate">
              {trainee.email}
            </p>
          </div>
        </div>
      </div>

      {/* Body com Ações */}
      <div className="p-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <button
            onClick={onCreatePlan}
            className="flex items-center justify-center gap-2 bg-green-50 hover:bg-green-100 text-green-700 font-medium py-3 px-4 rounded-lg transition-colors group/btn"
          >
            <svg
              className="w-5 h-5 group-hover/btn:scale-110 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span className="text-sm">Criar Plano</span>
          </button>

          <button
            onClick={onCreateReport}
            className="flex items-center justify-center gap-2 bg-orange-50 hover:bg-orange-100 text-orange-700 font-medium py-3 px-4 rounded-lg transition-colors group/btn"
          >
            <svg
              className="w-5 h-5 group-hover/btn:scale-110 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <span className="text-sm">Avaliação</span>
          </button>
        </div>

        {/* Secondary Actions */}
        <div className="space-y-2">
          <Link
            href={`/trainer/trainees/${trainee.id}`}
            className="flex items-center justify-between w-full px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group/link"
          >
            <span>Ver Perfil Completo</span>
            <svg
              className="w-4 h-4 text-gray-400 group-hover/link:text-indigo-600 group-hover/link:translate-x-1 transition-all"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>

          <button
            onClick={onViewHistory}
            className="flex items-center justify-between w-full px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group/link"
          >
            <span>Planos de Treino</span>
            <svg
              className="w-4 h-4 text-gray-400 group-hover/link:text-purple-600 group-hover/link:translate-x-1 transition-all"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          <button
            onClick={onViewReports}
            className="flex items-center justify-between w-full px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group/link"
          >
            <span>Avaliações Físicas</span>
            <svg
              className="w-4 h-4 text-gray-400 group-hover/link:text-orange-600 group-hover/link:translate-x-1 transition-all"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Edit Button */}
        <button
          onClick={onEdit}
          className="mt-4 w-full flex items-center justify-center gap-2 border-2 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 text-gray-700 hover:text-indigo-700 font-medium py-2.5 px-4 rounded-lg transition-all group/edit"
        >
          <svg
            className="w-4 h-4 group-hover/edit:scale-110 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          <span className="text-sm">Editar Aluno</span>
        </button>
      </div>
    </div>
  );
}
