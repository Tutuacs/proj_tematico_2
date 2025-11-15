"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportFunctionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let ReportFunctionsService = class ReportFunctionsService extends prisma_service_1.PrismaService {
    async createReport(data) {
        return this.report.create({
            data,
            select: {
                id: true,
                createdAt: true,
                content: true,
                imc: true,
                bodyFat: true,
                weight: true,
                height: true,
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
    async getAllReports() {
        return this.report.findMany({
            select: {
                id: true,
                createdAt: true,
                content: true,
                imc: true,
                bodyFat: true,
                weight: true,
                height: true,
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
    async getReportById(id) {
        return this.report.findUnique({
            where: { id },
            select: {
                id: true,
                createdAt: true,
                content: true,
                imc: true,
                bodyFat: true,
                weight: true,
                height: true,
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
    async getReportsWithFilters(filters) {
        const whereClause = {};
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
                height: true,
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
    async getReportsByTrainer(trainerId, filterProfileId) {
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
                height: true,
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
    async getReportsByTrainee(traineeId) {
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
                height: true,
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
    async updateReport(id, data) {
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
                height: true,
                profileId: true,
                planId: true,
            },
        });
    }
    async deleteReport(id) {
        return this.report.delete({
            where: { id },
        });
    }
    async verifyTraineeOwnership(traineeId, trainerId) {
        const profile = await this.profile.findUnique({
            where: { id: traineeId },
            select: {
                trainerId: true,
            },
        });
        return profile?.trainerId === trainerId;
    }
    async existReportById(id) {
        return this.report.findUnique({
            where: { id },
            select: { id: true },
        });
    }
};
exports.ReportFunctionsService = ReportFunctionsService;
exports.ReportFunctionsService = ReportFunctionsService = __decorate([
    (0, common_1.Injectable)()
], ReportFunctionsService);
//# sourceMappingURL=report-functions.service.js.map