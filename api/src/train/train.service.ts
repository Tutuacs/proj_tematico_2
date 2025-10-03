import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrainDto } from './dto/create-train.dto';
import { UpdateTrainDto } from './dto/update-train.dto';
import { TrainFunctionsService } from './train-functions/train-functions.service';
import { ROLE } from 'src/decorators';

@Injectable()
export class TrainService {
  constructor(private readonly trainFunctions: TrainFunctionsService) {}

  async create(
    createTrainDto: CreateTrainDto,
    profile: {
      id: string;
      email: string;
      role: number;
      name: string;
    },
  ) {
    // TRAINEE cria treinos baseados em seus planos
    if (profile.role === ROLE.TRAINEE) {
      // Verificar se o plano pertence ao usuário
      const hasAccess = await this.trainFunctions.verifyPlanOwnership(
        createTrainDto.planId,
        profile.id,
      );
      if (!hasAccess) {
        throw new NotFoundException('Plano não encontrado');
      }
    }

    if (profile.role === ROLE.TRAINER) {
      // TRAINER pode criar treinos para planos de seus alunos
      const hasAccess = await this.trainFunctions.verifyTrainerPlanAccess(
        createTrainDto.planId,
        profile.id,
      );
      if (!hasAccess) {
        throw new NotFoundException('Plano não encontrado');
      }
    }
    // ADMIN pode criar para qualquer plano (sem validação extra)

    return this.trainFunctions.createTrain(createTrainDto);
  }

  async findAll(profile: {
    id: string;
    email: string;
    role: number;
    name: string;
  }) {
    if (profile.role === ROLE.ADMIN) {
      return this.trainFunctions.getAllTrains();
    }
    
    if (profile.role === ROLE.TRAINER) {
      // TRAINER vê treinos de planos de seus alunos
      return this.trainFunctions.getTrainsByTrainer(profile.id);
    }
    
    // TRAINEE vê apenas seus próprios treinos
    return this.trainFunctions.getTrainsByTrainee(profile.id);
  }

  async findOne(
    id: string,
    profile: {
      id: string;
      email: string;
      role: number;
      name: string;
    },
  ) {
    const found = await this.trainFunctions.getTrainById(id);
    if (!found) {
      throw new NotFoundException('Treino não encontrado');
    }

    if (profile.role === ROLE.ADMIN) {
      return found;
    }

    if (profile.role === ROLE.TRAINER) {
      // TRAINER pode ver treinos de planos de seus alunos
      if (found.Plan.trainerId !== profile.id) {
        throw new NotFoundException('Treino não encontrado');
      }
      return found;
    }

    // TRAINEE pode ver apenas treinos de seus próprios planos
    if (found.Plan.traineeId !== profile.id) {
      throw new NotFoundException('Treino não encontrado');
    }

    return found;
  }

  async update(
    id: string,
    updateTrainDto: UpdateTrainDto,
    profile: {
      id: string;
      email: string;
      role: number;
      name: string;
    },
  ) {
    const found = await this.trainFunctions.getTrainById(id);
    if (!found) {
      throw new NotFoundException('Treino não encontrado');
    }

    if (profile.role === ROLE.TRAINEE) {
      // TRAINEE pode atualizar apenas treinos de seus próprios planos
      if (found.Plan.traineeId !== profile.id) {
        throw new NotFoundException('Treino não encontrado');
      }
    }

    if (profile.role === ROLE.TRAINER) {
      // TRAINER pode atualizar treinos de planos de seus alunos
      if (found.Plan.trainerId !== profile.id) {
        throw new NotFoundException('Treino não encontrado');
      }
    }
    // ADMIN pode atualizar qualquer treino (sem validação extra)

    return this.trainFunctions.updateTrain(id, updateTrainDto);
  }

  async remove(
    id: string,
    profile: {
      id: string;
      email: string;
      role: number;
      name: string;
    },
  ) {
    const found = await this.trainFunctions.getTrainById(id);
    if (!found) {
      throw new NotFoundException('Treino não encontrado');
    }

    if (profile.role === ROLE.TRAINEE) {
      // TRAINEE pode deletar apenas treinos de seus próprios planos
      if (found.Plan.traineeId !== profile.id) {
        throw new NotFoundException('Treino não encontrado');
      }
    }

    if (profile.role === ROLE.TRAINER) {
      // TRAINER pode deletar treinos de planos de seus alunos
      if (found.Plan.trainerId !== profile.id) {
        throw new NotFoundException('Treino não encontrado');
      }
    }
    // ADMIN pode deletar qualquer treino (sem validação extra)

    return this.trainFunctions.deleteTrain(id);
  }
}
