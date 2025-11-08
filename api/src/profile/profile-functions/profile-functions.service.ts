import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProfileFunctionsService extends PrismaService {
  async createProfile(data: any) {
    return this.profile.create({
      data,
    });
  }

  async getAllProfiles() {
    return this.profile.findMany({
      include: {
        Trainer: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async getAllProfilesTrainer(trainerId: string) {
    return this.profile.findMany({
      where: {
        OR: [
          // Alunos (role=0) vinculados a este instrutor
          { 
            AND: [
              { trainerId: trainerId },
              { role: 0 }
            ]
          },
          // Alunos (role=0) sem instrutor (disponíveis para vincular)
          { 
            AND: [
              { trainerId: null },
              { role: 0 }
            ]
          },
        ],
      },
      include: {
        Trainer: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async getProfileById(id: string) {
    return this.profile.findUnique({
      where: { id },
    });
  }

  async getProfileByEmail(email: string) {
    return this.profile.findUnique({
      where: { email },
    });
  }

  async updateProfile(id: string, data: any) {
    return this.profile.update({
      where: { id },
      data,
    });
  }

  async deleteProfile(id: string) {
    return this.profile.delete({
      where: { id },
    });
  }

  async existProfileById(id: string) {
    return this.profile.findUnique({
      where: { id },
      select: { id: true },
    });
  }

  async getTraineesByTrainer(trainerId: string) {
    return this.profile.findMany({
      where: {
        trainerId: trainerId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
  }
}
