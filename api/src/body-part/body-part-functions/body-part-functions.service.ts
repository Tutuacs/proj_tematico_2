import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BodyPartFunctionsService extends PrismaService {
  // Create a new body part
  async createBodyPart(data: any) {
    return this.bodyPart.create({
      data,
    });
  }

  // Get all body parts
  async getAllBodyParts() {
    return this.bodyPart.findMany({
      select: {
        id: true,
        name: true,
        bodyFat: true,
        reportId: true,
        Report: {
          select: {
            id: true,
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

  // Get body part by ID
  async getBodyPartById(id: string) {
    return this.bodyPart.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        bodyFat: true,
        reportId: true,
        Report: {
          select: {
            id: true,
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

  // Get body parts by report ID
  async getBodyPartsByReport(reportId: string) {
    return this.bodyPart.findMany({
      where: {
        reportId: reportId,
      },
      select: {
        id: true,
        name: true,
        bodyFat: true,
        reportId: true,
        Report: {
          select: {
            id: true,
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

  // Get body parts by trainer (from reports of their trainees)
  async getBodyPartsByTrainer(trainerId: string) {
    return this.bodyPart.findMany({
      where: {
        Report: {
          Trainee: {
            trainerId: trainerId,
          },
        },
      },
      select: {
        id: true,
        name: true,
        bodyFat: true,
        reportId: true,
        Report: {
          select: {
            id: true,
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

  // Get body parts by trainee (their own body parts)
  async getBodyPartsByTrainee(traineeId: string) {
    return this.bodyPart.findMany({
      where: {
        Report: {
          profileId: traineeId,
        },
      },
      select: {
        id: true,
        name: true,
        bodyFat: true,
        reportId: true,
        Report: {
          select: {
            id: true,
          },
        },
      },
    });
  }

  // Update body part
  async updateBodyPart(id: string, data: any) {
    return this.bodyPart.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        bodyFat: true,
        reportId: true,
      },
    });
  }

  // Delete body part
  async deleteBodyPart(id: string) {
    return this.bodyPart.delete({
      where: { id },
    });
  }

  // Verify if trainer has ownership of the report
  async verifyReportOwnership(reportId: string, trainerId: string): Promise<boolean> {
    const report = await this.report.findUnique({
      where: { id: reportId },
      select: {
        Trainee: {
          select: {
            trainerId: true,
          },
        },
      },
    });

    return report?.Trainee?.trainerId === trainerId;
  }

  // Verify access to body part
  async verifyBodyPartAccess(bodyPartId: string, userId: string, userType: 'trainer' | 'trainee'): Promise<boolean> {
    const bodyPart = await this.bodyPart.findUnique({
      where: { id: bodyPartId },
      select: {
        Report: {
          select: {
            profileId: true,
            Trainee: {
              select: {
                trainerId: true,
              },
            },
          },
        },
      },
    });

    if (!bodyPart) return false;

    if (userType === 'trainer') {
      return bodyPart.Report.Trainee.trainerId === userId;
    } else {
      return bodyPart.Report.profileId === userId;
    }
  }

  // Check if body part exists by ID
  async existBodyPartById(id: string) {
    return this.bodyPart.findUnique({
      where: { id },
      select: { id: true },
    });
  }
}
