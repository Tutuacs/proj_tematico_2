"use client";

import { useEffect, useState } from "react";
import Input from "@/components/ui/Input";
import { toast } from "@/components/ui/use-toast";
import { getToastConfig } from "@/components/ui/toastConfig";
import { useRouter } from "next/navigation";
import Modal from "@/components/ui/Modal"; // 👈 usa seu componente existente

interface User {
  id: string;
  name: string;
  email: string;
  role: number;
  trainerId?: string | null;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchUsers() {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3001/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Erro ao buscar usuários");
        const data = await res.json();

        if (!data || data.length === 0) {
          setUsers([
            { id: "MOCK-001", name: "Vinícius Lima", email: "vinicius@example.com", role: 1, trainerId: null },
            { id: "MOCK-002", name: "Mariana Souza", email: "mariana@example.com", role: 0, trainerId: "MOCK-001" },
          ]);
        } else setUsers(data);
      } catch {
        setUsers([
          { id: "MOCK-001", name: "Vinícius Lima", email: "vinicius@example.com", role: 1, trainerId: null },
          { id: "MOCK-002", name: "Mariana Souza", email: "mariana@example.com", role: 0, trainerId: "MOCK-001" },
        ]);
      }
    }
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
  const normalize = (text: string) =>
    text
      .toLowerCase()
      .normalize("NFD") // separa acentos
      .replace(/[\u0300-\u036f]/g, ""); // remove acentuação

  const terms = normalize(search).split(" ").filter(Boolean); // divide a busca por espaços
  const target =
    normalize(user.name || "") +
    " " +
    normalize(user.email || "") +
    " " +
    normalize(user.id || "");

  // cada termo digitado deve existir em algum ponto do nome, email ou id
  return terms.every((term) => target.includes(term));
});


  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!selectedUser) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3001/profile/${selectedUser.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: selectedUser.name,
          email: selectedUser.email,
          trainerId: selectedUser.trainerId,
          role: selectedUser.role,
        }),
      });

      if (!res.ok) throw new Error("Erro ao atualizar usuário");

      const config = getToastConfig("200");
      toast({ title: config?.title, description: "Usuário atualizado com sucesso!", variant: config?.variant });
      setIsModalOpen(false);
    } catch (error: any) {
      const config = getToastConfig("500");
      toast({ title: config?.title, description: error.message, variant: config?.variant });
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-11/12 max-w-6xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Usuários registrados</h1>
          <div className="relative">
            <Input
              type="text"
              placeholder="Buscar por nome, email ou matrícula"
              value={search}
              onChange={(e: any) => setSearch(e.target.value)}
              className="w-80 pr-10"
            />
            <span className="absolute right-3 top-2.5 text-gray-400 text-lg">🔍</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-900 text-white">
                <th className="p-3 text-left rounded-tl-lg">Matrícula</th>
                <th className="p-3 text-left">Nome Usuário</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Instrutor</th>
                <th className="p-3 text-center rounded-tr-lg">Editar</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="p-3">{user.id}</td>
                    <td className="p-3">{user.name || "—"}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">{user.trainerId ? "Sim" : "—"}</td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => handleEdit(user)}
                        className="px-3 py-1 text-sm font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
                      >
                        Editar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-500 italic">
                    Nenhum usuário encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 🧱 MODAL DE EDIÇÃO */}
 {isModalOpen && selectedUser && (
  <Modal
    open={isModalOpen}
    title="Editar Usuário"
    onClose={() => setIsModalOpen(false)}
  >
    <div className="flex flex-col gap-4 p-4">
      <label className="text-sm font-medium text-gray-700">Nome Completo</label>
      <Input
        type="text"
        value={selectedUser.name}
        onChange={(e: any) =>
          setSelectedUser({ ...selectedUser, name: e.target.value })
        }
      />

      <label className="text-sm font-medium text-gray-700">Email</label>
      <Input
        type="email"
        value={selectedUser.email}
        onChange={(e: any) =>
          setSelectedUser({ ...selectedUser, email: e.target.value })
        }
      />

      <label className="text-sm font-medium text-gray-700">Instrutor</label>
      <Input
        type="text"
        placeholder="ID do instrutor"
        value={selectedUser.trainerId || ""}
        onChange={(e: any) =>
          setSelectedUser({ ...selectedUser, trainerId: e.target.value })
        }
      />

      <label className="text-sm font-medium text-gray-700">Nível de Usuário</label>
      <select
        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={selectedUser.role}
        onChange={(e: any) =>
          setSelectedUser({ ...selectedUser, role: Number(e.target.value) })
        }
      >
        <option value={0}>Aluno</option>
        <option value={1}>Instrutor</option>
        <option value={2}>Administrador</option>
      </select>

      <button
        onClick={handleSave}
        className="mt-4 w-full py-2 bg-black text-white rounded hover:bg-gray-800 font-semibold transition-colors"
      >
        Salvar
      </button>
    </div>
  </Modal>
)}

    </main>
  );
}
