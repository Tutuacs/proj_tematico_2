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
exports.PlanService = void 0;
const common_1 = require("@nestjs/common");
const plan_functions_service_1 = require("./plan-functions/plan-functions.service");
const decorators_1 = require("../decorators");
let PlanService = class PlanService {
    constructor(planFunctions) {
        this.planFunctions = planFunctions;
    }
    async create(createPlanDto, profile) {
        if (profile.role === decorators_1.ROLE.TRAINEE) {
            throw new common_1.ForbiddenException('Apenas treinadores podem criar planos');
        }
        const planData = {
            ...createPlanDto,
            trainerId: profile.id,
        };
        return this.planFunctions.createPlan(planData);
    }
    async findAll(profile, filters) {
        if (profile.role === decorators_1.ROLE.ADMIN && filters) {
            return this.planFunctions.getPlansWithFilters(filters);
        }
        if (profile.role !== decorators_1.ROLE.ADMIN) {
            if (profile.role === decorators_1.ROLE.TRAINER) {
                return this.planFunctions.getPlansByTrainer(profile.id, filters?.traineeId);
            }
            return this.planFunctions.getPlansByTrainee(profile.id);
        }
        return this.planFunctions.getAllPlans();
    }
    async findOne(id, profile) {
        const found = await this.planFunctions.getPlanById(id);
        if (!found) {
            throw new common_1.NotFoundException('Plano não encontrado');
        }
        if (profile.role !== decorators_1.ROLE.ADMIN) {
            if (profile.role === decorators_1.ROLE.TRAINER) {
                if (found.trainerId !== profile.id) {
                    throw new common_1.NotFoundException('Plano não encontrado');
                }
                return found;
            }
            if (found.traineeId !== profile.id) {
                throw new common_1.NotFoundException('Plano não encontrado');
            }
        }
        return found;
    }
    async update(id, updatePlanDto, profile) {
        const found = await this.planFunctions.getPlanById(id);
        if (!found) {
            throw new common_1.NotFoundException('Plano não encontrado');
        }
        if (profile.role !== decorators_1.ROLE.ADMIN) {
            if (profile.role === decorators_1.ROLE.TRAINER) {
                if (found.trainerId !== profile.id) {
                    throw new common_1.NotFoundException('Plano não encontrado');
                }
                if ('trainerId' in updatePlanDto) {
                    const { trainerId, ...allowedUpdates } = updatePlanDto;
                    updatePlanDto = allowedUpdates;
                }
            }
            else {
                throw new common_1.ForbiddenException('Apenas treinadores podem editar planos');
            }
        }
        return this.planFunctions.updatePlan(id, updatePlanDto);
    }
    async remove(id, profile) {
        const found = await this.planFunctions.getPlanById(id);
        if (!found) {
            throw new common_1.NotFoundException('Plano não encontrado');
        }
        if (profile.role !== decorators_1.ROLE.ADMIN) {
            if (profile.role === decorators_1.ROLE.TRAINER) {
                if (found.trainerId !== profile.id) {
                    throw new common_1.NotFoundException('Plano não encontrado');
                }
            }
            else {
                throw new common_1.ForbiddenException('Apenas treinadores podem deletar planos');
            }
        }
        return this.planFunctions.deletePlan(id);
    }
    async createActivities(planId, activities, profile) {
        const found = await this.planFunctions.getPlanById(planId);
        if (!found) {
            throw new common_1.NotFoundException('Plano não encontrado');
        }
        if (profile.role !== decorators_1.ROLE.ADMIN) {
            if (profile.role === decorators_1.ROLE.TRAINER) {
                if (found.trainerId !== profile.id) {
                    throw new common_1.NotFoundException('Plano não encontrado');
                }
            }
            else {
                throw new common_1.ForbiddenException('Apenas treinadores podem criar atividades');
            }
        }
        return this.planFunctions.createActivitiesForPlan(planId, activities);
    }
    async deleteActivity(planId, activityId, profile) {
        const found = await this.planFunctions.getPlanById(planId);
        if (!found) {
            throw new common_1.NotFoundException('Plano não encontrado');
        }
        if (profile.role !== decorators_1.ROLE.ADMIN) {
            if (profile.role === decorators_1.ROLE.TRAINER) {
                if (found.trainerId !== profile.id) {
                    throw new common_1.NotFoundException('Plano não encontrado');
                }
            }
            else {
                throw new common_1.ForbiddenException('Apenas treinadores podem deletar atividades');
            }
        }
        return this.planFunctions.deleteActivity(activityId);
    }
};
exports.PlanService = PlanService;
exports.PlanService = PlanService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [plan_functions_service_1.PlanFunctionsService])
], PlanService);
//# sourceMappingURL=plan.service.js.map