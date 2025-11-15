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
exports.ActivityService = void 0;
const common_1 = require("@nestjs/common");
const activity_functions_service_1 = require("./activity-functions/activity-functions.service");
const decorators_1 = require("../decorators");
let ActivityService = class ActivityService {
    activityFunctions;
    constructor(activityFunctions) {
        this.activityFunctions = activityFunctions;
    }
    async create(createActivityDto, profile) {
        const planId = createActivityDto.planId;
        if (profile.role === decorators_1.ROLE.TRAINEE) {
            throw new common_1.NotFoundException('Apenas instrutores podem criar atividades no plano');
        }
        if (profile.role === decorators_1.ROLE.TRAINER) {
            const hasAccess = await this.activityFunctions.verifyTrainerPlanAccess(planId, profile.id);
            if (!hasAccess) {
                throw new common_1.NotFoundException('Plano não encontrado');
            }
        }
        return this.activityFunctions.createActivity(createActivityDto);
    }
    async findAll(profile) {
        if (profile.role === decorators_1.ROLE.ADMIN) {
            return this.activityFunctions.getAllActivities();
        }
        if (profile.role === decorators_1.ROLE.TRAINER) {
            return this.activityFunctions.getActivitiesByTrainer(profile.id);
        }
        return this.activityFunctions.getActivitiesByTrainee(profile.id);
    }
    async findOne(id, profile) {
        const found = await this.activityFunctions.getActivityById(id);
        if (!found) {
            throw new common_1.NotFoundException('Atividade não encontrada');
        }
        if (profile.role === decorators_1.ROLE.ADMIN) {
            return found;
        }
        if (profile.role === decorators_1.ROLE.TRAINER) {
            if (found.Plan.trainerId !== profile.id) {
                throw new common_1.NotFoundException('Atividade não encontrada');
            }
            return found;
        }
        if (found.Plan.traineeId !== profile.id) {
            throw new common_1.NotFoundException('Atividade não encontrada');
        }
        return found;
    }
    async update(id, updateActivityDto, profile) {
        const found = await this.activityFunctions.getActivityById(id);
        if (!found) {
            throw new common_1.NotFoundException('Atividade não encontrada');
        }
        if (!found.Plan) {
            if (profile.role === decorators_1.ROLE.TRAINEE) {
                throw new common_1.NotFoundException('Atividade não encontrada');
            }
            return this.activityFunctions.updateActivity(id, updateActivityDto);
        }
        if (profile.role === decorators_1.ROLE.TRAINEE) {
            if (found.Plan.traineeId !== profile.id) {
                throw new common_1.NotFoundException('Atividade não encontrada');
            }
        }
        if (profile.role === decorators_1.ROLE.TRAINER) {
            if (found.Plan.trainerId !== profile.id) {
                throw new common_1.NotFoundException('Atividade não encontrada');
            }
        }
        return this.activityFunctions.updateActivity(id, updateActivityDto);
    }
    async remove(id, profile) {
        const found = await this.activityFunctions.getActivityById(id);
        if (!found) {
            throw new common_1.NotFoundException('Atividade não encontrada');
        }
        if (!found.Plan) {
            if (profile.role === decorators_1.ROLE.TRAINEE) {
                throw new common_1.NotFoundException('Atividade não encontrada');
            }
            return this.activityFunctions.deleteActivity(id);
        }
        if (profile.role === decorators_1.ROLE.TRAINEE) {
            if (found.Plan.traineeId !== profile.id) {
                throw new common_1.NotFoundException('Atividade não encontrada');
            }
        }
        if (profile.role === decorators_1.ROLE.TRAINER) {
            if (found.Plan.trainerId !== profile.id) {
                throw new common_1.NotFoundException('Atividade não encontrada');
            }
        }
        return this.activityFunctions.deleteActivity(id);
    }
};
exports.ActivityService = ActivityService;
exports.ActivityService = ActivityService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [activity_functions_service_1.ActivityFunctionsService])
], ActivityService);
//# sourceMappingURL=activity.service.js.map