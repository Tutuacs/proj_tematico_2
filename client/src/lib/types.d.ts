export type Profile = {
  id: string;
  name: string;
  password?: string;
  email: string;
};

export type Trainee = {
  id: string;
  enrollment: string; // matrícula
  name: string;
  email: string;
  trainerName?: string;
};

// # (opcional) Tipos compartilhados (Trainee)