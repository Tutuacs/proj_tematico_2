"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityFunctionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let ActivityFunctionsService = class ActivityFunctionsService extends prisma_service_1.PrismaService {
    async createActivity(data) {
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
    async getActivityById(id) {
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
    async getActivitiesByTrainer(trainerId) {
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
    async getActivitiesByTrainee(traineeId) {
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
    async updateActivity(id, data) {
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
    async deleteActivity(id) {
        return this.activity.delete({
            where: { id },
        });
    }
    async verifyPlanOwnership(planId, traineeId) {
        const plan = await this.plan.findUnique({
            where: { id: planId },
            select: {
                traineeId: true,
            },
        });
        return plan?.traineeId === traineeId;
    }
    async verifyTrainerPlanAccess(planId, trainerId) {
        const plan = await this.plan.findUnique({
            where: { id: planId },
            select: {
                trainerId: true,
            },
        });
        return plan?.trainerId === trainerId;
    }
    async existActivityById(id) {
        return this.activity.findUnique({
            where: { id },
            select: { id: true },
        });
    }
};
exports.ActivityFunctionsService = ActivityFunctionsService;
exports.ActivityFunctionsService = ActivityFunctionsService = __decorate([
    (0, common_1.Injectable)()
], ActivityFunctionsService);
//# sourceMappingURL=activity-functions.service.js.map