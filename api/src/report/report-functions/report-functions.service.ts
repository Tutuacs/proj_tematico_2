import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReportFunctionsService extends PrismaService {
  // Create a new report
  async createReport(data: any) {
    return this.report.create({
      data,
      select: {
        id: true,
        createdAt: true,
        content: true,
        imc: true,
        bodyFat: true,
        weight: true,
        profileId: true,
        planId: true,
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

  // Get all reports
  async getAllReports() {
    return this.report.findMany({
      select: {
        id: true,
        createdAt: true,
        content: true,
        imc: true,
        bodyFat: true,
        weight: true,
        profileId: true,
        planId: true,
        Trainee: {
          select: {
            id: true,
            name: true,
            email: true,
            trainerId: true,
          },
        },
        BodyPart: {
          select: {
            id: true,
            name: true,
            bodyFat: true,
          },
        },
      },
    });
  }

  // Get report by ID
  async getReportById(id: string) {
    return this.report.findUnique({
      where: { id },
      select: {
        id: true,
        createdAt: true,
        content: true,
        imc: true,
        bodyFat: true,
        weight: true,
        profileId: true,
        createdBy: true,
        planId: true,
        Trainee: {
          select: {
            id: true,
            name: true,
            email: true,
            trainerId: true,
          },
        },
        Trainer: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        BodyPart: {
          select: {
            id: true,
            name: true,
            bodyFat: true,
          },
        },
        Plan: {
          select: {
            id: true,
            title: true,
            description: true,
          },
        },
      },
    });
  }

  // Get reports with filters (for ADMIN)
  async getReportsWithFilters(filters: {
    profileId?: string;
    from?: string;
    to?: string;
  }) {
    const whereClause: any = {};

    if (filters.profileId) {
      whereClause.profileId = filters.profileId;
    }

    if (filters.from || filters.to) {
      whereClause.createdAt = {};
      if (filters.from) {
        whereClause.createdAt.gte = new Date(filters.from);
      }
      if (filters.to) {
        whereClause.createdAt.lte = new Date(filters.to);
      }
    }

    return this.report.findMany({
      where: whereClause,
      select: {
        id: true,
        createdAt: true,
        content: true,
        imc: true,
        bodyFat: true,
        weight: true,
        profileId: true,
        planId: true,
        Trainee: {
          select: {
            id: true,
            name: true,
            email: true,
            trainerId: true,
          },
        },
        BodyPart: {
          select: {
            id: true,
            name: true,
            bodyFat: true,
          },
        },
      },
    });
  }

  // Get reports by trainer (from their trainees)
  async getReportsByTrainer(trainerId: string, filterProfileId?: string) {
    return this.report.findMany({
      where: {
        Trainee: {
          trainerId: trainerId,
        },
        ...(filterProfileId && { profileId: filterProfileId }),
      },
      select: {
        id: true,
        createdAt: true,
        content: true,
        imc: true,
        bodyFat: true,
        weight: true,
        profileId: true,
        planId: true,
        Trainee: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        BodyPart: {
          select: {
            id: true,
            name: true,
            bodyFat: true,
          },
        },
      },
    });
  }

  // Get reports by trainee (their own reports)
  async getReportsByTrainee(traineeId: string) {
    return this.report.findMany({
      where: {
        profileId: traineeId,
      },
      select: {
        id: true,
        createdAt: true,
        content: true,
        imc: true,
        bodyFat: true,
        weight: true,
        profileId: true,
        planId: true,
        BodyPart: {
          select: {
            id: true,
            name: true,
            bodyFat: true,
          },
        },
        Plan: {
          select: {
            id: true,
            title: true,
            description: true,
          },
        },
      },
    });
  }

  // Update report
  async updateReport(id: string, data: any) {
    return this.report.update({
      where: { id },
      data,
      select: {
        id: true,
        createdAt: true,
        content: true,
        imc: true,
        bodyFat: true,
        weight: true,
        profileId: true,
        planId: true,
      },
    });
  }

  // Delete report
  async deleteReport(id: string) {
    return this.report.delete({
      where: { id },
    });
  }

  // Verify if trainee belongs to trainer
  async verifyTraineeOwnership(traineeId: string, trainerId: string): Promise<boolean> {
    const profile = await this.profile.findUnique({
      where: { id: traineeId },
      select: {
        trainerId: true,
      },
    });

    return profile?.trainerId === trainerId;
  }

  // Check if report exists by ID
  async existReportById(id: string) {
    return this.report.findUnique({
      where: { id },
      select: { id: true },
    });
  }
}
