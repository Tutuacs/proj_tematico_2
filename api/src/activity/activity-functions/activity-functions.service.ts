import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ActivityFunctionsService extends PrismaService {
  // Create a new activity
  async createActivity(data: any) {
    return this.activity.create({
      data,
      select: {
        id: true,
        name: true,
        ACTIVITY_TYPE: true,
        description: true,
        weight: true,
        reps: true,
        sets: true,
        duration: true,
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

  // Get all activities
  async getAllActivities() {
    return this.activity.findMany({
      select: {
        id: true,
        name: true,
        ACTIVITY_TYPE: true,
        description: true,
        weight: true,
        reps: true,
        sets: true,
        duration: true,
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
          },
        },
      },
    });
  }

  // Get activity by ID
  async getActivityById(id: string) {
    return this.activity.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        ACTIVITY_TYPE: true,
        description: true,
        weight: true,
        reps: true,
        sets: true,
        duration: true,
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
            Train: {
              select: {
                id: true,
                from: true,
                to: true,
              },
            },
          },
        },
      },
    });
  }

  // Get activities by trainer (from plans of their trainees)
  async getActivitiesByTrainer(trainerId: string) {
    return this.activity.findMany({
      where: {
        Plan: {
          trainerId: trainerId,
        },
      },
      select: {
        id: true,
        name: true,
        ACTIVITY_TYPE: true,
        description: true,
        weight: true,
        reps: true,
        sets: true,
        duration: true,
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

  // Get activities by trainee (their own activities)
  async getActivitiesByTrainee(traineeId: string) {
    return this.activity.findMany({
      where: {
        Plan: {
          traineeId: traineeId,
        },
      },
      select: {
        id: true,
        name: true,
        ACTIVITY_TYPE: true,
        description: true,
        weight: true,
        reps: true,
        sets: true,
        duration: true,
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
            Train: {
              select: {
                id: true,
                from: true,
                to: true,
              },
            },
          },
        },
      },
    });
  }

  // Update activity
  async updateActivity(id: string, data: any) {
    return this.activity.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        ACTIVITY_TYPE: true,
        description: true,
        weight: true,
        reps: true,
        sets: true,
        duration: true,
        planId: true,
      },
    });
  }

  // Delete activity
  async deleteActivity(id: string) {
    return this.activity.delete({
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

  // Check if activity exists by ID
  async existActivityById(id: string) {
    return this.activity.findUnique({
      where: { id },
      select: { id: true },
    });
  }
}
