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
    // planId é obrigatório - Activity sempre pertence a um Plan
    const planId = createActivityDto.planId;

    // TRAINEE não pode criar Activities (apenas TRAINER e ADMIN)
    if (profile.role === ROLE.TRAINEE) {
      throw new NotFoundException('Apenas instrutores podem criar atividades no plano');
    }

    if (profile.role === ROLE.TRAINER) {
      // TRAINER só pode criar atividades para planos de seus alunos
      const hasAccess = await this.activityFunctions.verifyTrainerPlanAccess(
        planId,
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
  }, planId?: string) {
    // Se planId foi fornecido, filtrar por plano específico
    if (planId) {
      const activities = await this.activityFunctions.getActivitiesByPlan(planId);
      
      // Admin pode ver atividades de qualquer plano
      if (profile.role === ROLE.ADMIN) {
        return activities;
      }
      
      // Verificar se há atividades e se o usuário tem acesso ao plano
      if (activities.length > 0) {
        const plan = activities[0].Plan;
        
        // TRAINER pode ver atividades de planos de seus alunos
        if (profile.role === ROLE.TRAINER && plan.trainerId === profile.id) {
          return activities;
        }
        
        // TRAINEE pode ver atividades de seus próprios planos
        if (profile.role === ROLE.TRAINEE && plan.traineeId === profile.id) {
          return activities;
        }
      }
      
      // Se não tem acesso, retorna array vazio
      return [];
    }
    
    // Se não foi fornecido planId, retornar todas as atividades conforme permissão
    if (profile.role === ROLE.ADMIN) {
      return this.activityFunctions.getAllActivities();
    }
    
    if (profile.role === ROLE.TRAINER) {
      // TRAINER vê atividades de planos de seus alunos
      return this.activityFunctions.getActivitiesByTrainer(profile.id);
    }
    
    // TRAINEE vê atividades dos seus planos
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

    // Admin pode ver qualquer atividade
    if (profile.role === ROLE.ADMIN) {
      return found;
    }

    // Validar acesso ao plano
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

    // Se a atividade não tem plano (atividade genérica do catálogo)
    // Apenas TRAINER e ADMIN podem editar
    if (!found.Plan) {
      if (profile.role === ROLE.TRAINEE) {
        throw new NotFoundException('Atividade não encontrada');
      }
      return this.activityFunctions.updateActivity(id, updateActivityDto);
    }

    // Se tem plano, validar acesso
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

    // Se a atividade não tem plano (atividade genérica do catálogo)
    // Apenas TRAINER e ADMIN podem deletar
    if (!found.Plan) {
      if (profile.role === ROLE.TRAINEE) {
        throw new NotFoundException('Atividade não encontrada');
      }
      return this.activityFunctions.deleteActivity(id);
    }

    // Se tem plano, validar acesso
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
