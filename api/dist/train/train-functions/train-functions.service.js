"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainFunctionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let TrainFunctionsService = class TrainFunctionsService extends prisma_service_1.PrismaService {
    async createTrain(data) {
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
    async getAllTrains() {
        return this.train.findMany({
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
    async getTrainById(id) {
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
    async getTrainsByTrainer(trainerId) {
        return this.train.findMany({
            where: {
                Plan: {
                    trainerId: trainerId,
                },
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
    async getTrainsByPlan(planId) {
        return this.train.findMany({
            where: {
                planId: planId,
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
    async getTrainsByTrainee(traineeId) {
        return this.train.findMany({
            where: {
                Plan: {
                    traineeId: traineeId,
                },
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
    async updateTrain(id, data) {
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
    async deleteTrain(id) {
        return this.train.delete({
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
    async existTrainById(id) {
        return this.train.findUnique({
            where: { id },
            select: { id: true },
        });
    }
};
exports.TrainFunctionsService = TrainFunctionsService;
exports.TrainFunctionsService = TrainFunctionsService = __decorate([
    (0, common_1.Injectable)()
], TrainFunctionsService);
//# sourceMappingURL=train-functions.service.js.map