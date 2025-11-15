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
exports.ReportService = void 0;
const common_1 = require("@nestjs/common");
const report_functions_service_1 = require("./report-functions/report-functions.service");
const decorators_1 = require("../decorators");
let ReportService = class ReportService {
    reportFunctions;
    constructor(reportFunctions) {
        this.reportFunctions = reportFunctions;
    }
    async create(createReportDto, profile) {
        if (profile.role === decorators_1.ROLE.TRAINER) {
            const hasAccess = await this.reportFunctions.verifyTraineeOwnership(createReportDto.profileId, profile.id);
            if (!hasAccess) {
                throw new common_1.NotFoundException('Perfil não encontrado');
            }
        }
        let calculatedImc = createReportDto.imc;
        if (createReportDto.weight && createReportDto.height && !createReportDto.imc) {
            const heightInMeters = createReportDto.height / 100;
            calculatedImc = createReportDto.weight / (heightInMeters * heightInMeters);
            calculatedImc = Math.round(calculatedImc * 100) / 100;
        }
        const dataWithCreator = {
            ...createReportDto,
            createdBy: profile.id,
            imc: calculatedImc,
        };
        return this.reportFunctions.createReport(dataWithCreator);
    }
    async findAll(profile, filters) {
        if (profile.role === decorators_1.ROLE.ADMIN && filters) {
            return this.reportFunctions.getReportsWithFilters(filters);
        }
        if (profile.role === decorators_1.ROLE.ADMIN) {
            return this.reportFunctions.getAllReports();
        }
        if (profile.role === decorators_1.ROLE.TRAINER) {
            return this.reportFunctions.getReportsByTrainer(profile.id, filters?.profileId);
        }
        return this.reportFunctions.getReportsByTrainee(profile.id);
    }
    async findOne(id, profile) {
        const found = await this.reportFunctions.getReportById(id);
        if (!found) {
            throw new common_1.NotFoundException('Relatório não encontrado');
        }
        if (profile.role === decorators_1.ROLE.ADMIN) {
            return found;
        }
        if (profile.role === decorators_1.ROLE.TRAINER) {
            if (found.Trainee.trainerId !== profile.id) {
                throw new common_1.NotFoundException('Relatório não encontrado');
            }
            return found;
        }
        if (found.profileId !== profile.id) {
            throw new common_1.NotFoundException('Relatório não encontrado');
        }
        return found;
    }
    async update(id, updateReportDto, profile) {
        const found = await this.reportFunctions.getReportById(id);
        if (!found) {
            throw new common_1.NotFoundException('Relatório não encontrado');
        }
        if (profile.role === decorators_1.ROLE.TRAINER) {
            if (found.Trainee.trainerId !== profile.id) {
                throw new common_1.NotFoundException('Relatório não encontrado');
            }
        }
        return this.reportFunctions.updateReport(id, updateReportDto);
    }
    async remove(id, profile) {
        const found = await this.reportFunctions.getReportById(id);
        if (!found) {
            throw new common_1.NotFoundException('Relatório não encontrado');
        }
        if (profile.role === decorators_1.ROLE.TRAINER) {
            if (found.Trainee.trainerId !== profile.id) {
                throw new common_1.NotFoundException('Relatório não encontrado');
            }
        }
        return this.reportFunctions.deleteReport(id);
    }
};
exports.ReportService = ReportService;
exports.ReportService = ReportService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [report_functions_service_1.ReportFunctionsService])
], ReportService);
//# sourceMappingURL=report.service.js.map