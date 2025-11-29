import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TrainFunctionsService extends PrismaService {
  // Create a new train
  async createTrain(data: any) {
    return this.train.create({
      data: {
        ...data,
        from: new Date(data.from),
        to: new Date(data.to),
      },
      select: {
        id: true,
        from: true,
        to: true,
        planId: true,
        Plan: {
          select: {
            id: true,
            title: true,
            traineeId: true,
            trainerId: true,
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
    });
  }

  // Get all trains
  async getAllTrains() {
    return this.train.findMany({
      orderBy: {
        from: 'desc', // Do mais recente para o mais antigo
      },
      select: {
        id: true,
        weekDay: true,
        from: true,
        to: true,
        planId: true,
        Plan: {
          select: {
            id: true,
            title: true,
            traineeId: true,
            trainerId: true,
            Trainee: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        Exercise: {
          select: {
            id: true,
            weight: true,
            reps: true,
            sets: true,
            duration: true,
            description: true,
            Activity: {
              select: {
                id: true,
                name: true,
                ACTIVITY_TYPE: true,
                sets: true,
                reps: true,
                weight: true,
                duration: true,
              },
            },
          },
        },
      },
    });
  }

  // Get train by ID
  async getTrainById(id: string) {
    return this.train.findUnique({
      where: { id },
      select: {
        id: true,
        weekDay: true,
        from: true,
        to: true,
        planId: true,
        Plan: {
          select: {
            id: true,
            title: true,
            traineeId: true,
            trainerId: true,
            Trainee: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        Exercise: {
          select: {
            id: true,
            weight: true,
            reps: true,
            sets: true,
            duration: true,
            description: true,
            Activity: {
              select: {
                id: true,
                name: true,
                ACTIVITY_TYPE: true,
                description: true,
                sets: true,
                reps: true,
                weight: true,
                duration: true,
              },
            },
          },
        },
      },
    });
  }

  // Get trains by trainer (from plans of their trainees)
  async getTrainsByTrainer(trainerId: string) {
    return this.train.findMany({
      where: {
        Plan: {
          trainerId: trainerId,
        },
      },
      orderBy: {
        from: 'desc', // Do mais recente para o mais antigo
      },
      select: {
        id: true,
        from: true,
        to: true,
        planId: true,
        Plan: {
          select: {
            id: true,
            title: true,
            traineeId: true,
            Trainee: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        Exercise: {
          select: {
            id: true,
            weight: true,
            reps: true,
            sets: true,
            duration: true,
          },
        },
      },
    });
  }

  // Get trains by plan ID
  async getTrainsByPlan(planId: string) {
    return this.train.findMany({
      where: {
        planId: planId,
      },
      orderBy: {
        from: 'desc', // Do mais recente para o mais antigo
      },
      select: {
        id: true,
        from: true,
        to: true,
        planId: true,
        weekDay: true,
        Plan: {
          select: {
            id: true,
            title: true,
            traineeId: true,
            trainerId: true,
            Trainee: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        Exercise: {
          select: {
            id: true,
            weight: true,
            reps: true,
            sets: true,
            duration: true,
            description: true,
            Activity: {
              select: {
                id: true,
                name: true,
                ACTIVITY_TYPE: true,
                description: true,
              },
            },
          },
        },
      },
    });
  }

  // Get trains by trainee (their own trains)
  async getTrainsByTrainee(traineeId: string) {
    return this.train.findMany({
      where: {
        Plan: {
          traineeId: traineeId,
        },
      },
      orderBy: {
        from: 'desc', // Do mais recente para o mais antigo
      },
      select: {
        id: true,
        weekDay: true,
        from: true,
        to: true,
        planId: true,
        Plan: {
          select: {
            id: true,
            title: true,
            description: true,
          },
        },
        Exercise: {
          select: {
            id: true,
            weight: true,
            reps: true,
            sets: true,
            duration: true,
            description: true,
            Activity: {
              select: {
                id: true,
                name: true,
                ACTIVITY_TYPE: true,
                description: true,
                sets: true,
                reps: true,
                weight: true,
                duration: true,
              },
            },
          },
        },
      },
    });
  }

  // Update train
  async updateTrain(id: string, data: any) {
    return this.train.update({
      where: { id },
      data,
      select: {
        id: true,
        from: true,
        to: true,
        planId: true,
      },
    });
  }

  // Delete train
  async deleteTrain(id: string) {
    return this.train.delete({
      where: { id },
    });
  }

  // Verify if plan belongs to trainee
  async verifyPlanOwnership(planId: string, traineeId: string): Promise<boolean> {
    const plan = await this.plan.findUnique({
      where: { id: planId },
      select: {
        traineeId: true,
      },
    });

    return plan?.traineeId === traineeId;
  }

  // Verify if trainer has access to plan
  async verifyTrainerPlanAccess(planId: string, trainerId: string): Promise<boolean> {
    const plan = await this.plan.findUnique({
      where: { id: planId },
      select: {
        trainerId: true,
      },
    });

    return plan?.trainerId === trainerId;
  }

  // Check if train exists by ID
  async existTrainById(id: string) {
    return this.train.findUnique({
      where: { id },
      select: { id: true },
    });
  }
}
