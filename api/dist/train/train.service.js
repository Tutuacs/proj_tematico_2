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
exports.TrainService = void 0;
const common_1 = require("@nestjs/common");
const train_functions_service_1 = require("./train-functions/train-functions.service");
const decorators_1 = require("../decorators");
let TrainService = class TrainService {
    trainFunctions;
    constructor(trainFunctions) {
        this.trainFunctions = trainFunctions;
    }
    async create(createTrainDto, profile) {
        if (profile.role === decorators_1.ROLE.TRAINEE) {
            const hasAccess = await this.trainFunctions.verifyPlanOwnership(createTrainDto.planId, profile.id);
            if (!hasAccess) {
                throw new common_1.NotFoundException('Plano não encontrado');
            }
        }
        if (profile.role === decorators_1.ROLE.TRAINER) {
            const hasAccess = await this.trainFunctions.verifyTrainerPlanAccess(createTrainDto.planId, profile.id);
            if (!hasAccess) {
                throw new common_1.NotFoundException('Plano não encontrado');
            }
        }
        return this.trainFunctions.createTrain(createTrainDto);
    }
    async findAll(profile, filters) {
        if (profile.role === decorators_1.ROLE.ADMIN) {
            if (filters?.planId) {
                return this.trainFunctions.getTrainsByPlan(filters.planId);
            }
            return this.trainFunctions.getAllTrains();
        }
        if (profile.role === decorators_1.ROLE.TRAINER) {
            if (filters?.planId) {
                return this.trainFunctions.getTrainsByPlan(filters.planId);
            }
            return this.trainFunctions.getTrainsByTrainer(profile.id);
        }
        if (filters?.planId) {
            return this.trainFunctions.getTrainsByPlan(filters.planId);
        }
        return this.trainFunctions.getTrainsByTrainee(profile.id);
    }
    async findOne(id, profile) {
        const found = await this.trainFunctions.getTrainById(id);
        if (!found) {
            throw new common_1.NotFoundException('Treino não encontrado');
        }
        if (profile.role === decorators_1.ROLE.ADMIN) {
            return found;
        }
        if (profile.role === decorators_1.ROLE.TRAINER) {
            if (found.Plan.trainerId !== profile.id) {
                throw new common_1.NotFoundException('Treino não encontrado');
            }
            return found;
        }
        if (found.Plan.traineeId !== profile.id) {
            throw new common_1.NotFoundException('Treino não encontrado');
        }
        return found;
    }
    async update(id, updateTrainDto, profile) {
        const found = await this.trainFunctions.getTrainById(id);
        if (!found) {
            throw new common_1.NotFoundException('Treino não encontrado');
        }
        if (profile.role === decorators_1.ROLE.TRAINEE) {
            if (found.Plan.traineeId !== profile.id) {
                throw new common_1.NotFoundException('Treino não encontrado');
            }
        }
        if (profile.role === decorators_1.ROLE.TRAINER) {
            if (found.Plan.trainerId !== profile.id) {
                throw new common_1.NotFoundException('Treino não encontrado');
            }
        }
        return this.trainFunctions.updateTrain(id, updateTrainDto);
    }
    async remove(id, profile) {
        const found = await this.trainFunctions.getTrainById(id);
        if (!found) {
            throw new common_1.NotFoundException('Treino não encontrado');
        }
        if (profile.role === decorators_1.ROLE.TRAINEE) {
            if (found.Plan.traineeId !== profile.id) {
                throw new common_1.NotFoundException('Treino não encontrado');
            }
        }
        if (profile.role === decorators_1.ROLE.TRAINER) {
            if (found.Plan.trainerId !== profile.id) {
                throw new common_1.NotFoundException('Treino não encontrado');
            }
        }
        return this.trainFunctions.deleteTrain(id);
    }
};
exports.TrainService = TrainService;
exports.TrainService = TrainService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [train_functions_service_1.TrainFunctionsService])
], TrainService);
//# sourceMappingURL=train.service.js.map