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

    // TRAINER can only create plans for their trainees or themselves
    if (profile.role === ROLE.TRAINER) {
      // Set trainerId to current user if TRAINER
      createPlanDto.trainerId = profile.id;
    }

    return this.planFunctions.createPlan(createPlanDto);
  }

  async findAll(profile: {
    id: string;
    email: string;
    role: number;
    name: string;
  }) {
    if (profile.role !== ROLE.ADMIN) {
      if (profile.role === ROLE.TRAINER) {
        // TRAINER sees plans they created
        return this.planFunctions.getPlansByTrainer(profile.id);
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
        // TRAINER cannot change trainerId
        const { trainerId, ...allowedUpdates } = updatePlanDto;
        updatePlanDto = allowedUpdates as UpdatePlanDto;
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
}
