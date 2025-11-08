import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { PlanFunctionsService } from './plan-functions/plan-functions.service';
import { ROLE } from 'src/decorators';

@Injectable()
export class PlanService {
  constructor(private readonly planFunctions: PlanFunctionsService) {}

  async create(
    createPlanDto: CreatePlanDto,
    profile: {
      id: string;
      email: string;
      role: number;
      name: string;
    },
  ) {
    // Only TRAINER and ADMIN can create plans
    if (profile.role === ROLE.TRAINEE) {
      throw new ForbiddenException('Apenas treinadores podem criar planos');
    }

    // Adicionar trainerId automaticamente
    const planData = {
      ...createPlanDto,
      trainerId: profile.id,
    };

    return this.planFunctions.createPlan(planData);
  }

  async findAll(
    profile: {
      id: string;
      email: string;
      role: number;
      name: string;
    },
    filters?: {
      traineeId?: string;
      trainerId?: string;
      active?: string;
    },
  ) {
    // Apply filters if provided by ADMIN
    if (profile.role === ROLE.ADMIN && filters) {
      return this.planFunctions.getPlansWithFilters(filters);
    }

    if (profile.role !== ROLE.ADMIN) {
      if (profile.role === ROLE.TRAINER) {
        // TRAINER sees plans they created (can be filtered by traineeId)
        return this.planFunctions.getPlansByTrainer(
          profile.id,
          filters?.traineeId,
        );
      }
      // TRAINEE sees only their own plans
      return this.planFunctions.getPlansByTrainee(profile.id);
    }

    // ADMIN sees all plans
    return this.planFunctions.getAllPlans();
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
    const found = await this.planFunctions.getPlanById(id);
    if (!found) {
      throw new NotFoundException('Plano não encontrado');
    }

    if (profile.role !== ROLE.ADMIN) {
      if (profile.role === ROLE.TRAINER) {
        // TRAINER can see plans they created
        if (found.trainerId !== profile.id) {
          throw new NotFoundException('Plano não encontrado');
        }
        return found;
      }
      // TRAINEE can only see their own plans
      if (found.traineeId !== profile.id) {
        throw new NotFoundException('Plano não encontrado');
      }
    }

    return found;
  }

  async update(
    id: string,
    updatePlanDto: UpdatePlanDto,
    profile: {
      id: string;
      email: string;
      role: number;
      name: string;
    },
  ) {
    const found = await this.planFunctions.getPlanById(id);
    if (!found) {
      throw new NotFoundException('Plano não encontrado');
    }

    if (profile.role !== ROLE.ADMIN) {
      if (profile.role === ROLE.TRAINER) {
        // TRAINER can only update plans they created
        if (found.trainerId !== profile.id) {
          throw new NotFoundException('Plano não encontrado');
        }
        // TRAINER cannot change trainerId - remove if present
        if ('trainerId' in updatePlanDto) {
          const { trainerId, ...allowedUpdates } = updatePlanDto as any;
          updatePlanDto = allowedUpdates as UpdatePlanDto;
        }
      } else {
        // TRAINEE cannot update plans
        throw new ForbiddenException('Apenas treinadores podem editar planos');
      }
    }

    return this.planFunctions.updatePlan(id, updatePlanDto);
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
    const found = await this.planFunctions.getPlanById(id);
    if (!found) {
      throw new NotFoundException('Plano não encontrado');
    }

    if (profile.role !== ROLE.ADMIN) {
      if (profile.role === ROLE.TRAINER) {
        // TRAINER can only delete plans they created
        if (found.trainerId !== profile.id) {
          throw new NotFoundException('Plano não encontrado');
        }
      } else {
        // TRAINEE cannot delete plans
        throw new ForbiddenException('Apenas treinadores podem deletar planos');
      }
    }

    return this.planFunctions.deletePlan(id);
  }

  async createActivities(
    planId: string,
    activities: any[],
    profile: {
      id: string;
      email: string;
      role: number;
      name: string;
    },
  ) {
    // Verify plan exists and user has access
    const found = await this.planFunctions.getPlanById(planId);
    if (!found) {
      throw new NotFoundException('Plano não encontrado');
    }

    if (profile.role !== ROLE.ADMIN) {
      if (profile.role === ROLE.TRAINER) {
        // TRAINER can only add activities to plans they created
        if (found.trainerId !== profile.id) {
          throw new NotFoundException('Plano não encontrado');
        }
      } else {
        // TRAINEE cannot create activities
        throw new ForbiddenException('Apenas treinadores podem criar atividades');
      }
    }

    return this.planFunctions.createActivitiesForPlan(planId, activities);
  }

  async deleteActivity(
    planId: string,
    activityId: string,
    profile: {
      id: string;
      email: string;
      role: number;
      name: string;
    },
  ) {
    // Verify plan exists and user has access
    const found = await this.planFunctions.getPlanById(planId);
    if (!found) {
      throw new NotFoundException('Plano não encontrado');
    }

    if (profile.role !== ROLE.ADMIN) {
      if (profile.role === ROLE.TRAINER) {
        // TRAINER can only delete activities from plans they created
        if (found.trainerId !== profile.id) {
          throw new NotFoundException('Plano não encontrado');
        }
      } else {
        // TRAINEE cannot delete activities
        throw new ForbiddenException('Apenas treinadores podem deletar atividades');
      }
    }

    return this.planFunctions.deleteActivity(activityId);
  }
}
