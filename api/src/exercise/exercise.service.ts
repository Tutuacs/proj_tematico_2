import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ROLE } from 'src/decorators';

@Injectable()
export class ExerciseService {
  constructor(private prisma: PrismaService) {}

  async create(
    createExerciseDto: CreateExerciseDto,
    profile: { id: string; role: number },
  ) {
    // Verificar se o train e activity existem
    const train = await this.prisma.train.findUnique({
      where: { id: createExerciseDto.trainId },
      include: {
        Plan: {
          include: {
            Trainee: true,
          },
        },
      },
    });

    if (!train) {
      throw new NotFoundException('Train not found');
    }

    // TRAINEE só pode criar exercises para seus próprios planos
    if (profile.role === ROLE.TRAINEE && train.Plan.traineeId !== profile.id) {
      throw new ForbiddenException(
        'You can only create exercises for your own plans',
      );
    }

    const activity = await this.prisma.activity.findUnique({
      where: { id: createExerciseDto.activityId },
    });

    if (!activity) {
      throw new NotFoundException('Activity not found');
    }

    return this.prisma.exercise.create({
      data: createExerciseDto,
      include: {
        Activity: true,
        Train: {
          include: {
            Plan: true,
          },
        },
      },
    });
  }

  async findAll(
    filters: { traineeId?: string; planId?: string; trainId?: string },
    profile: { id: string; role: number },
  ) {
    const where: any = {};

    // Se TRAINEE, só pode ver seus próprios exercises
    if (profile.role === ROLE.TRAINEE) {
      where.Train = {
        Plan: {
          traineeId: profile.id,
        },
      };
    }

    // Aplicar filtros adicionais
    if (filters.trainId) {
      where.trainId = filters.trainId;
    }

    if (filters.planId) {
      where.Train = {
        ...where.Train,
        planId: filters.planId,
      };
    }

    if (filters.traineeId) {
      // TRAINEE não pode filtrar por outros traineeId
      if (
        profile.role === ROLE.TRAINEE &&
        filters.traineeId !== profile.id
      ) {
        throw new ForbiddenException('You can only view your own exercises');
      }

      where.Train = {
        ...where.Train,
        Plan: {
          traineeId: filters.traineeId,
        },
      };
    }

    return this.prisma.exercise.findMany({
      where,
      include: {
        Activity: true,
        Train: {
          include: {
            Plan: {
              include: {
                Trainee: {
                  select: {
                    id: true,
                    name: true,
                    email: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        Train: {
          from: 'desc',
        },
      },
    });
  }

  async findOne(id: string, profile: { id: string; role: number }) {
    const exercise = await this.prisma.exercise.findUnique({
      where: { id },
      include: {
        Activity: true,
        Train: {
          include: {
            Plan: {
              include: {
                Trainee: {
                  select: {
                    id: true,
                    name: true,
                    email: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!exercise) {
      throw new NotFoundException('Exercise not found');
    }

    // TRAINEE só pode ver seus próprios exercises
    if (
      profile.role === ROLE.TRAINEE &&
      exercise.Train.Plan.traineeId !== profile.id
    ) {
      throw new ForbiddenException('You can only view your own exercises');
    }

    return exercise;
  }

  async update(
    id: string,
    updateExerciseDto: UpdateExerciseDto,
    profile: { id: string; role: number },
  ) {
    const exercise = await this.findOne(id, profile);

    // TRAINEE só pode editar seus próprios exercises
    if (
      profile.role === ROLE.TRAINEE &&
      exercise.Train.Plan.traineeId !== profile.id
    ) {
      throw new ForbiddenException('You can only update your own exercises');
    }

    return this.prisma.exercise.update({
      where: { id },
      data: updateExerciseDto,
      include: {
        Activity: true,
        Train: {
          include: {
            Plan: true,
          },
        },
      },
    });
  }

  async remove(id: string, profile: { id: string; role: number }) {
    const exercise = await this.findOne(id, profile);

    // TRAINEE só pode deletar seus próprios exercises
    if (
      profile.role === ROLE.TRAINEE &&
      exercise.Train.Plan.traineeId !== profile.id
    ) {
      throw new ForbiddenException('You can only delete your own exercises');
    }

    return this.prisma.exercise.delete({
      where: { id },
    });
  }
}
