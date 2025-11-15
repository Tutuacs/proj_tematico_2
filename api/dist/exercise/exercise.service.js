"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExerciseService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const decorators_1 = require("../decorators");
let ExerciseService = class ExerciseService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createExerciseDto, profile) {
        const train = await this.prisma.train.findUnique({
            where: { id: createExerciseDto.trainId },
            include: {
                Plan: {
                    include: {
                        Trainee: true,
                    },
                },
            },
        });
        if (!train) {
            throw new common_1.NotFoundException('Train not found');
        }
        if (profile.role === decorators_1.ROLE.TRAINEE && train.Plan.traineeId !== profile.id) {
            throw new common_1.ForbiddenException('You can only create exercises for your own plans');
        }
        const activity = await this.prisma.activity.findUnique({
            where: { id: createExerciseDto.activityId },
        });
        if (!activity) {
            throw new common_1.NotFoundException('Activity not found');
        }
        return this.prisma.exercise.create({
            data: createExerciseDto,
            include: {
                Activity: true,
                Train: {
                    include: {
                        Plan: true,
                    },
                },
            },
        });
    }
    async findAll(filters, profile) {
        const where = {};
        if (profile.role === decorators_1.ROLE.TRAINEE) {
            where.Train = {
                Plan: {
                    traineeId: profile.id,
                },
            };
        }
        if (filters.trainId) {
            where.trainId = filters.trainId;
        }
        if (filters.planId) {
            where.Train = {
                ...where.Train,
                planId: filters.planId,
            };
        }
        if (filters.traineeId) {
            if (profile.role === decorators_1.ROLE.TRAINEE &&
                filters.traineeId !== profile.id) {
                throw new common_1.ForbiddenException('You can only view your own exercises');
            }
            where.Train = {
                ...where.Train,
                Plan: {
                    traineeId: filters.traineeId,
                },
            };
        }
        return this.prisma.exercise.findMany({
            where,
            include: {
                Activity: true,
                Train: {
                    include: {
                        Plan: {
                            include: {
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
                },
            },
            orderBy: {
                Train: {
                    from: 'desc',
                },
            },
        });
    }
    async findOne(id, profile) {
        const exercise = await this.prisma.exercise.findUnique({
            where: { id },
            include: {
                Activity: true,
                Train: {
                    include: {
                        Plan: {
                            include: {
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
                },
            },
        });
        if (!exercise) {
            throw new common_1.NotFoundException('Exercise not found');
        }
        if (profile.role === decorators_1.ROLE.TRAINEE &&
            exercise.Train.Plan.traineeId !== profile.id) {
            throw new common_1.ForbiddenException('You can only view your own exercises');
        }
        return exercise;
    }
    async update(id, updateExerciseDto, profile) {
        const exercise = await this.findOne(id, profile);
        if (profile.role === decorators_1.ROLE.TRAINEE &&
            exercise.Train.Plan.traineeId !== profile.id) {
            throw new common_1.ForbiddenException('You can only update your own exercises');
        }
        return this.prisma.exercise.update({
            where: { id },
            data: updateExerciseDto,
            include: {
                Activity: true,
                Train: {
                    include: {
                        Plan: true,
                    },
                },
            },
        });
    }
    async remove(id, profile) {
        const exercise = await this.findOne(id, profile);
        if (profile.role === decorators_1.ROLE.TRAINEE &&
            exercise.Train.Plan.traineeId !== profile.id) {
            throw new common_1.ForbiddenException('You can only delete your own exercises');
        }
        return this.prisma.exercise.delete({
            where: { id },
        });
    }
};
exports.ExerciseService = ExerciseService;
exports.ExerciseService = ExerciseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ExerciseService);
//# sourceMappingURL=exercise.service.js.map