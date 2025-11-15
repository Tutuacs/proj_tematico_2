"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BodyPartFunctionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let BodyPartFunctionsService = class BodyPartFunctionsService extends prisma_service_1.PrismaService {
    async createBodyPart(data) {
        return this.bodyPart.create({
            data,
        });
    }
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
    async getBodyPartById(id) {
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
    async getBodyPartsByReport(reportId) {
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
    async getBodyPartsByTrainer(trainerId) {
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
    async getBodyPartsByTrainee(traineeId) {
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
    async updateBodyPart(id, data) {
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
    async deleteBodyPart(id) {
        return this.bodyPart.delete({
            where: { id },
        });
    }
    async verifyReportOwnership(reportId, trainerId) {
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
    async verifyBodyPartAccess(bodyPartId, userId, userType) {
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
        if (!bodyPart)
            return false;
        if (userType === 'trainer') {
            return bodyPart.Report.Trainee.trainerId === userId;
        }
        else {
            return bodyPart.Report.profileId === userId;
        }
    }
    async existBodyPartById(id) {
        return this.bodyPart.findUnique({
            where: { id },
            select: { id: true },
        });
    }
};
exports.BodyPartFunctionsService = BodyPartFunctionsService;
exports.BodyPartFunctionsService = BodyPartFunctionsService = __decorate([
    (0, common_1.Injectable)()
], BodyPartFunctionsService);
//# sourceMappingURL=body-part-functions.service.js.map