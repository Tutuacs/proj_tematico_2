import { NextResponse } from "next/server";

export async function GET() {
  // mocks estáveis para desenvolvimento
  const data = [
    { id: "1", enrollment: "A-10001", name: "Ana Souza",   email: "ana@ex.com",   trainerName: "Carlos" },
    { id: "2", enrollment: "A-10002", name: "Bruno Lima",  email: "bruno@ex.com", trainerName: "Carlos" },
    { id: "3", enrollment: "A-10003", name: "Carla Reis",  email: "carla@ex.com", trainerName: "Carlos" },
    { id: "4", enrollment: "A-10004", name: "Diego Nunes", email: "diego@ex.com", trainerName: "Carlos" },
  ];

  return NextResponse.json(data);
}