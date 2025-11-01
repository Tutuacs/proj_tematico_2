import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateBodyPartDto } from './dto/create-body-part.dto';
import { UpdateBodyPartDto } from './dto/update-body-part.dto';
import { BodyPartFunctionsService } from './body-part-functions/body-part-functions.service';
import { ROLE } from 'src/decorators';

@Injectable()
export class BodyPartService {
  constructor(private readonly bodyPartFunctions: BodyPartFunctionsService) {}

  async create(
    createBodyPartDto: CreateBodyPartDto,
    profile: {
      id: string;
      email: string;
      role: number;
      name: string;
    },
  ) {
    // Only TRAINER and ADMIN can create body parts
    if (profile.role === ROLE.TRAINEE) {
      throw new ForbiddenException('Apenas treinadores podem criar medidas corporais');
    }

    // Verify if the report belongs to trainer's trainee (for TRAINER role)
    if (profile.role === ROLE.TRAINER) {
      const reportOwnership = await this.bodyPartFunctions.verifyReportOwnership(
        createBodyPartDto.reportId,
        profile.id,
      );
      if (!reportOwnership) {
        throw new ForbiddenException('Você não tem permissão para adicionar medidas a este relatório');
      }
    }

    return this.bodyPartFunctions.createBodyPart(createBodyPartDto);
  }

  async findAll(
    profile: {
      id: string;
      email: string;
      role: number;
      name: string;
    },
    filters?: {
      reportId?: string;
    },
  ) {
    // If reportId filter is provided, use it
    if (filters?.reportId) {
      return this.bodyPartFunctions.getBodyPartsByReport(filters.reportId);
    }

    if (profile.role !== ROLE.ADMIN) {
      if (profile.role === ROLE.TRAINER) {
        // TRAINER sees body parts from reports of their trainees
        return this.bodyPartFunctions.getBodyPartsByTrainer(profile.id);
      }
      // TRAINEE sees only their own body parts
      return this.bodyPartFunctions.getBodyPartsByTrainee(profile.id);
    }

    // ADMIN sees all body parts
    return this.bodyPartFunctions.getAllBodyParts();
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
    const found = await this.bodyPartFunctions.getBodyPartById(id);
    if (!found) {
      throw new NotFoundException('Medida corporal não encontrada');
    }

    if (profile.role !== ROLE.ADMIN) {
      if (profile.role === ROLE.TRAINER) {
        // TRAINER can see body parts from reports of their trainees
        const hasAccess = await this.bodyPartFunctions.verifyBodyPartAccess(id, profile.id, 'trainer');
        if (!hasAccess) {
          throw new NotFoundException('Medida corporal não encontrada');
        }
        return found;
      }
      // TRAINEE can only see their own body parts
      const hasAccess = await this.bodyPartFunctions.verifyBodyPartAccess(id, profile.id, 'trainee');
      if (!hasAccess) {
        throw new NotFoundException('Medida corporal não encontrada');
      }
    }

    return found;
  }

  async update(
    id: string,
    updateBodyPartDto: UpdateBodyPartDto,
    profile: {
      id: string;
      email: string;
      role: number;
      name: string;
    },
  ) {
    const found = await this.bodyPartFunctions.getBodyPartById(id);
    if (!found) {
      throw new NotFoundException('Medida corporal não encontrada');
    }

    if (profile.role !== ROLE.ADMIN) {
      if (profile.role === ROLE.TRAINER) {
        // TRAINER can only update body parts from reports of their trainees
        const hasAccess = await this.bodyPartFunctions.verifyBodyPartAccess(id, profile.id, 'trainer');
        if (!hasAccess) {
          throw new NotFoundException('Medida corporal não encontrada');
        }
      } else {
        // TRAINEE cannot update body parts
        throw new ForbiddenException('Apenas treinadores podem editar medidas corporais');
      }
    }

    return this.bodyPartFunctions.updateBodyPart(id, updateBodyPartDto);
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
    const found = await this.bodyPartFunctions.getBodyPartById(id);
    if (!found) {
      throw new NotFoundException('Medida corporal não encontrada');
    }

    if (profile.role !== ROLE.ADMIN) {
      if (profile.role === ROLE.TRAINER) {
        // TRAINER can only delete body parts from reports of their trainees
        const hasAccess = await this.bodyPartFunctions.verifyBodyPartAccess(id, profile.id, 'trainer');
        if (!hasAccess) {
          throw new NotFoundException('Medida corporal não encontrada');
        }
      } else {
        // TRAINEE cannot delete body parts
        throw new ForbiddenException('Apenas treinadores podem deletar medidas corporais');
      }
    }

    return this.bodyPartFunctions.deleteBodyPart(id);
  }
}
