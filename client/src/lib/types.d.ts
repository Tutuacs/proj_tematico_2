export type Profile = {
  id: string;
  name: string;
  password?: string;
  email: string;
  role?: number;
  trainerId?: string;
  Trainer?: Profile; // Relação com o instrutor
};

export type Trainee = Profile; // Trainee é um Profile com role específico
