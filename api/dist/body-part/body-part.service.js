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
exports.BodyPartService = void 0;
const common_1 = require("@nestjs/common");
const body_part_functions_service_1 = require("./body-part-functions/body-part-functions.service");
const decorators_1 = require("../decorators");
let BodyPartService = class BodyPartService {
    constructor(bodyPartFunctions) {
        this.bodyPartFunctions = bodyPartFunctions;
    }
    async create(createBodyPartDto, profile) {
        if (profile.role === decorators_1.ROLE.TRAINEE) {
            throw new common_1.ForbiddenException('Apenas treinadores podem criar medidas corporais');
        }
        if (profile.role === decorators_1.ROLE.TRAINER) {
            const reportOwnership = await this.bodyPartFunctions.verifyReportOwnership(createBodyPartDto.reportId, profile.id);
            if (!reportOwnership) {
                throw new common_1.ForbiddenException('Você não tem permissão para adicionar medidas a este relatório');
            }
        }
        return this.bodyPartFunctions.createBodyPart(createBodyPartDto);
    }
    async findAll(profile, filters) {
        if (filters?.reportId) {
            return this.bodyPartFunctions.getBodyPartsByReport(filters.reportId);
        }
        if (profile.role !== decorators_1.ROLE.ADMIN) {
            if (profile.role === decorators_1.ROLE.TRAINER) {
                return this.bodyPartFunctions.getBodyPartsByTrainer(profile.id);
            }
            return this.bodyPartFunctions.getBodyPartsByTrainee(profile.id);
        }
        return this.bodyPartFunctions.getAllBodyParts();
    }
    async findOne(id, profile) {
        const found = await this.bodyPartFunctions.getBodyPartById(id);
        if (!found) {
            throw new common_1.NotFoundException('Medida corporal não encontrada');
        }
        if (profile.role !== decorators_1.ROLE.ADMIN) {
            if (profile.role === decorators_1.ROLE.TRAINER) {
                const hasAccess = await this.bodyPartFunctions.verifyBodyPartAccess(id, profile.id, 'trainer');
                if (!hasAccess) {
                    throw new common_1.NotFoundException('Medida corporal não encontrada');
                }
                return found;
            }
            const hasAccess = await this.bodyPartFunctions.verifyBodyPartAccess(id, profile.id, 'trainee');
            if (!hasAccess) {
                throw new common_1.NotFoundException('Medida corporal não encontrada');
            }
        }
        return found;
    }
    async update(id, updateBodyPartDto, profile) {
        const found = await this.bodyPartFunctions.getBodyPartById(id);
        if (!found) {
            throw new common_1.NotFoundException('Medida corporal não encontrada');
        }
        if (profile.role !== decorators_1.ROLE.ADMIN) {
            if (profile.role === decorators_1.ROLE.TRAINER) {
                const hasAccess = await this.bodyPartFunctions.verifyBodyPartAccess(id, profile.id, 'trainer');
                if (!hasAccess) {
                    throw new common_1.NotFoundException('Medida corporal não encontrada');
                }
            }
            else {
                throw new common_1.ForbiddenException('Apenas treinadores podem editar medidas corporais');
            }
        }
        return this.bodyPartFunctions.updateBodyPart(id, updateBodyPartDto);
    }
    async remove(id, profile) {
        const found = await this.bodyPartFunctions.getBodyPartById(id);
        if (!found) {
            throw new common_1.NotFoundException('Medida corporal não encontrada');
        }
        if (profile.role !== decorators_1.ROLE.ADMIN) {
            if (profile.role === decorators_1.ROLE.TRAINER) {
                const hasAccess = await this.bodyPartFunctions.verifyBodyPartAccess(id, profile.id, 'trainer');
                if (!hasAccess) {
                    throw new common_1.NotFoundException('Medida corporal não encontrada');
                }
            }
            else {
                throw new common_1.ForbiddenException('Apenas treinadores podem deletar medidas corporais');
            }
        }
        return this.bodyPartFunctions.deleteBodyPart(id);
    }
};
exports.BodyPartService = BodyPartService;
exports.BodyPartService = BodyPartService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [body_part_functions_service_1.BodyPartFunctionsService])
], BodyPartService);
//# sourceMappingURL=body-part.service.js.map