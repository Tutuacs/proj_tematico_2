import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { ActivityFunctionsService } from './activity-functions/activity-functions.service';
import { ROLE } from 'src/decorators';

@Injectable()
export class ActivityService {
  constructor(private readonly activityFunctions: ActivityFunctionsService) {}

  async create(
    createActivityDto: CreateActivityDto,
    profile: {
      id: string;
      email: string;
      role: number;
      name: string;
    },
  ) {
    // TRAINEE cria atividades baseadas em seus planos
    if (profile.role === ROLE.TRAINEE) {
      // Verificar se o plano pertence ao usuário
      const hasAccess = await this.activityFunctions.verifyPlanOwnership(
        createActivityDto.planId,
        profile.id,
      );
      if (!hasAccess) {
        throw new NotFoundException('Plano não encontrado');
      }
    }

    if (profile.role === ROLE.TRAINER) {
      // TRAINER pode criar atividades para planos de seus alunos
      const hasAccess = await this.activityFunctions.verifyTrainerPlanAccess(
        createActivityDto.planId,
        profile.id,
      );
      if (!hasAccess) {
        throw new NotFoundException('Plano não encontrado');
      }
    }
    // ADMIN pode criar para qualquer plano (sem validação extra)

    return this.activityFunctions.createActivity(createActivityDto);
  }

  async findAll(profile: {
    id: string;
    email: string;
    role: number;
    name: string;
  }) {
    if (profile.role === ROLE.ADMIN) {
      return this.activityFunctions.getAllActivities();
    }
    
    if (profile.role === ROLE.TRAINER) {
      // TRAINER vê atividades de planos de seus alunos
      return this.activityFunctions.getActivitiesByTrainer(profile.id);
    }
    
    // TRAINEE vê apenas suas próprias atividades
    return this.activityFunctions.getActivitiesByTrainee(profile.id);
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
    const found = await this.activityFunctions.getActivityById(id);
    if (!found) {
      throw new NotFoundException('Atividade não encontrada');
    }

    if (profile.role === ROLE.ADMIN) {
      return found;
    }

    if (profile.role === ROLE.TRAINER) {
      // TRAINER pode ver atividades de planos de seus alunos
      if (found.Plan.trainerId !== profile.id) {
        throw new NotFoundException('Atividade não encontrada');
      }
      return found;
    }

    // TRAINEE pode ver apenas atividades de seus próprios planos
    if (found.Plan.traineeId !== profile.id) {
      throw new NotFoundException('Atividade não encontrada');
    }

    return found;
  }

  async update(
    id: string,
    updateActivityDto: UpdateActivityDto,
    profile: {
      id: string;
      email: string;
      role: number;
      name: string;
    },
  ) {
    const found = await this.activityFunctions.getActivityById(id);
    if (!found) {
      throw new NotFoundException('Atividade não encontrada');
    }

    if (profile.role === ROLE.TRAINEE) {
      // TRAINEE pode atualizar apenas atividades de seus próprios planos
      if (found.Plan.traineeId !== profile.id) {
        throw new NotFoundException('Atividade não encontrada');
      }
    }

    if (profile.role === ROLE.TRAINER) {
      // TRAINER pode atualizar atividades de planos de seus alunos
      if (found.Plan.trainerId !== profile.id) {
        throw new NotFoundException('Atividade não encontrada');
      }
    }
    // ADMIN pode atualizar qualquer atividade (sem validação extra)

    return this.activityFunctions.updateActivity(id, updateActivityDto);
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
    const found = await this.activityFunctions.getActivityById(id);
    if (!found) {
      throw new NotFoundException('Atividade não encontrada');
    }

    if (profile.role === ROLE.TRAINEE) {
      // TRAINEE pode deletar apenas atividades de seus próprios planos
      if (found.Plan.traineeId !== profile.id) {
        throw new NotFoundException('Atividade não encontrada');
      }
    }

    if (profile.role === ROLE.TRAINER) {
      // TRAINER pode deletar atividades de planos de seus alunos
      if (found.Plan.trainerId !== profile.id) {
        throw new NotFoundException('Atividade não encontrada');
      }
    }
    // ADMIN pode deletar qualquer atividade (sem validação extra)

    return this.activityFunctions.deleteActivity(id);
  }
}
