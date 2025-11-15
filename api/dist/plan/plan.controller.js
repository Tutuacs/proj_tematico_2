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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanController = void 0;
const common_1 = require("@nestjs/common");
const plan_service_1 = require("./plan.service");
const create_plan_dto_1 = require("./dto/create-plan.dto");
const update_plan_dto_1 = require("./dto/update-plan.dto");
const guards_1 = require("../guards");
const decorators_1 = require("../decorators");
const ProfileAtuh_decorator_1 = require("../decorators/ProfileAtuh.decorator");
let PlanController = class PlanController {
    constructor(planService) {
        this.planService = planService;
    }
    create(createPlanDto, profile) {
        return this.planService.create(createPlanDto, profile);
    }
    findAll(profile, traineeId, trainerId, active) {
        return this.planService.findAll(profile, { traineeId, trainerId, active });
    }
    findOne(id, profile) {
        return this.planService.findOne(id, profile);
    }
    update(id, updatePlanDto, profile) {
        return this.planService.update(id, updatePlanDto, profile);
    }
    remove(id, profile) {
        return this.planService.remove(id, profile);
    }
    createActivities(id, activities, profile) {
        return this.planService.createActivities(id, activities, profile);
    }
    deleteActivity(planId, activityId, profile) {
        return this.planService.deleteActivity(planId, activityId, profile);
    }
};
exports.PlanController = PlanController;
__decorate([
    (0, decorators_1.Access)(decorators_1.ROLE.TRAINER, decorators_1.ROLE.ADMIN),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, ProfileAtuh_decorator_1.ProfileAuth)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_plan_dto_1.CreatePlanDto, Object]),
    __metadata("design:returntype", void 0)
], PlanController.prototype, "create", null);
__decorate([
    (0, decorators_1.Access)(decorators_1.ROLE.TRAINEE, decorators_1.ROLE.TRAINER, decorators_1.ROLE.ADMIN),
    (0, common_1.Get)(),
    __param(0, (0, ProfileAtuh_decorator_1.ProfileAuth)()),
    __param(1, (0, common_1.Query)('traineeId')),
    __param(2, (0, common_1.Query)('trainerId')),
    __param(3, (0, common_1.Query)('active')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", void 0)
], PlanController.prototype, "findAll", null);
__decorate([
    (0, decorators_1.Access)(decorators_1.ROLE.TRAINEE, decorators_1.ROLE.TRAINER, decorators_1.ROLE.ADMIN),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, ProfileAtuh_decorator_1.ProfileAuth)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PlanController.prototype, "findOne", null);
__decorate([
    (0, decorators_1.Access)(decorators_1.ROLE.TRAINER, decorators_1.ROLE.ADMIN),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, ProfileAtuh_decorator_1.ProfileAuth)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_plan_dto_1.UpdatePlanDto, Object]),
    __metadata("design:returntype", void 0)
], PlanController.prototype, "update", null);
__decorate([
    (0, decorators_1.Access)(decorators_1.ROLE.TRAINER, decorators_1.ROLE.ADMIN),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, ProfileAtuh_decorator_1.ProfileAuth)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PlanController.prototype, "remove", null);
__decorate([
    (0, decorators_1.Access)(decorators_1.ROLE.TRAINER, decorators_1.ROLE.ADMIN),
    (0, common_1.Post)(':id/activities'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, ProfileAtuh_decorator_1.ProfileAuth)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array, Object]),
    __metadata("design:returntype", void 0)
], PlanController.prototype, "createActivities", null);
__decorate([
    (0, decorators_1.Access)(decorators_1.ROLE.TRAINER, decorators_1.ROLE.ADMIN),
    (0, common_1.Delete)(':planId/activities/:activityId'),
    __param(0, (0, common_1.Param)('planId')),
    __param(1, (0, common_1.Param)('activityId')),
    __param(2, (0, ProfileAtuh_decorator_1.ProfileAuth)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], PlanController.prototype, "deleteActivity", null);
exports.PlanController = PlanController = __decorate([
    (0, common_1.UseGuards)(guards_1.AuthGuard, guards_1.RoleGuard),
    (0, common_1.Controller)('plan'),
    __metadata("design:paramtypes", [plan_service_1.PlanService])
], PlanController);
//# sourceMappingURL=plan.controller.js.map