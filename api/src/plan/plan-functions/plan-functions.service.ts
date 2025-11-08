import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PlanFunctionsService extends PrismaService {
  // Create a new plan
  async createPlan(data: any) {
    return this.plan.create({
      data: {
        ...data,
        from: new Date(data.from),
        to: new Date(data.to),
      },
    });
  }

  // Get all plans
  async getAllPlans() {
    return this.plan.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        from: true,
        to: true,
        trainerId: true,
        traineeId: true,
        Trainer: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        Trainee: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  // Get plan by ID
  async getPlanById(id: string) {
    return this.plan.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        description: true,
        from: true,
        to: true,
        trainerId: true,
        traineeId: true,
        Trainer: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        Trainee: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        Activity: {
          select: {
            id: true,
            name: true,
            ACTIVITY_TYPE: true,
            description: true,
            weight: true,
            reps: true,
            sets: true,
            duration: true,
          },
        },
        Train: {
          select: {
            id: true,
            weekDay: true,
            from: true,
            to: true,
          },
        },
      },
    });
  }

  // Get plans with filters (for ADMIN)
  async getPlansWithFilters(filters: {
    traineeId?: string;
    trainerId?: string;
    active?: string;
  }) {
    const now = new Date();
    const whereClause: any = {};

    if (filters.traineeId) {
      whereClause.traineeId = filters.traineeId;
    }

    if (filters.trainerId) {
      whereClause.trainerId = filters.trainerId;
    }

    if (filters.active === 'true') {
      whereClause.from = { lte: now };
      whereClause.to = { gte: now };
    } else if (filters.active === 'false') {
      whereClause.OR = [{ from: { gt: now } }, { to: { lt: now } }];
    }

    return this.plan.findMany({
      where: whereClause,
      select: {
        id: true,
        title: true,
        description: true,
        from: true,
        to: true,
        trainerId: true,
        traineeId: true,
        Trainer: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        Trainee: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  // Get plans by trainer
  async getPlansByTrainer(trainerId: string, filterTraineeId?: string) {
    return this.plan.findMany({
      where: {
        trainerId: trainerId,
        ...(filterTraineeId && { traineeId: filterTraineeId }),
      },
      select: {
        id: true,
        title: true,
        description: true,
        from: true,
        to: true,
        trainerId: true,
        traineeId: true,
        Trainee: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        Train: {
          select: {
            id: true,
            weekDay: true,
          },
        },
      },
    });
  }

  // Get plans by trainee
  async getPlansByTrainee(traineeId: string) {
    return this.plan.findMany({
      where: {
        traineeId: traineeId,
      },
      select: {
        id: true,
        title: true,
        description: true,
        from: true,
        to: true,
        trainerId: true,
        traineeId: true,
        Trainer: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        Activity: {
          select: {
            id: true,
            name: true,
            ACTIVITY_TYPE: true,
            description: true,
            weight: true,
            reps: true,
            sets: true,
            duration: true,
          },
        },
        Train: {
          select: {
            id: true,
            weekDay: true,
            from: true,
            to: true,
          },
        },
      },
    });
  }

  // Update plan
  async updatePlan(id: string, data: any) {
    return this.plan.update({
      where: { id },
      data,
      select: {
        id: true,
        title: true,
        description: true,
        from: true,
        to: true,
        trainerId: true,
        traineeId: true,
      },
    });
  }

  // Delete plan
  async deletePlan(id: string) {
    return this.plan.delete({
      where: { id },
    });
  }

  // Check if plan exists by ID
  async existPlanById(id: string) {
    return this.plan.findUnique({
      where: { id },
      select: { id: true },
    });
  }

  // Create multiple activities for a plan
  async createActivitiesForPlan(planId: string, activities: any[]) {
    const activitiesWithPlanId = activities.map(activity => ({
      ...activity,
      planId,
    }));

    return this.activity.createMany({
      data: activitiesWithPlanId,
    });
  }

  // Delete an activity
  async deleteActivity(activityId: string) {
    return this.activity.delete({
      where: { id: activityId },
    });
  }
}
