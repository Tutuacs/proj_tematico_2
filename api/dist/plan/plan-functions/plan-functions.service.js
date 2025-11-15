"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanFunctionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let PlanFunctionsService = class PlanFunctionsService extends prisma_service_1.PrismaService {
    async createPlan(data) {
        return this.plan.create({
            data: {
                ...data,
                from: new Date(data.from),
                to: new Date(data.to),
            },
        });
    }
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
    async getPlanById(id) {
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
    async getPlansWithFilters(filters) {
        const now = new Date();
        const whereClause = {};
        if (filters.traineeId) {
            whereClause.traineeId = filters.traineeId;
        }
        if (filters.trainerId) {
            whereClause.trainerId = filters.trainerId;
        }
        if (filters.active === 'true') {
            whereClause.from = { lte: now };
            whereClause.to = { gte: now };
        }
        else if (filters.active === 'false') {
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
    async getPlansByTrainer(trainerId, filterTraineeId) {
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
    async getPlansByTrainee(traineeId) {
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
    async updatePlan(id, data) {
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
    async deletePlan(id) {
        return this.plan.delete({
            where: { id },
        });
    }
    async existPlanById(id) {
        return this.plan.findUnique({
            where: { id },
            select: { id: true },
        });
    }
    async createActivitiesForPlan(planId, activities) {
        const activitiesWithPlanId = activities.map(activity => ({
            ...activity,
            planId,
        }));
        return this.activity.createMany({
            data: activitiesWithPlanId,
        });
    }
    async deleteActivity(activityId) {
        return this.activity.delete({
            where: { id: activityId },
        });
    }
};
exports.PlanFunctionsService = PlanFunctionsService;
exports.PlanFunctionsService = PlanFunctionsService = __decorate([
    (0, common_1.Injectable)()
], PlanFunctionsService);
//# sourceMappingURL=plan-functions.service.js.map