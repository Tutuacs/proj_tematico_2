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
exports.ExerciseController = void 0;
const common_1 = require("@nestjs/common");
const exercise_service_1 = require("./exercise.service");
const create_exercise_dto_1 = require("./dto/create-exercise.dto");
const update_exercise_dto_1 = require("./dto/update-exercise.dto");
const guards_1 = require("../guards");
const decorators_1 = require("../decorators");
const ProfileAtuh_decorator_1 = require("../decorators/ProfileAtuh.decorator");
let ExerciseController = class ExerciseController {
    constructor(exerciseService) {
        this.exerciseService = exerciseService;
    }
    create(createExerciseDto, profile) {
        return this.exerciseService.create(createExerciseDto, profile);
    }
    findAll(profile, traineeId, planId, trainId) {
        return this.exerciseService.findAll({ traineeId, planId, trainId }, profile);
    }
    findOne(id, profile) {
        return this.exerciseService.findOne(id, profile);
    }
    update(id, updateExerciseDto, profile) {
        return this.exerciseService.update(id, updateExerciseDto, profile);
    }
    remove(id, profile) {
        return this.exerciseService.remove(id, profile);
    }
};
exports.ExerciseController = ExerciseController;
__decorate([
    (0, decorators_1.Access)(decorators_1.ROLE.TRAINEE, decorators_1.ROLE.TRAINER, decorators_1.ROLE.ADMIN),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, ProfileAtuh_decorator_1.ProfileAuth)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_exercise_dto_1.CreateExerciseDto, Object]),
    __metadata("design:returntype", void 0)
], ExerciseController.prototype, "create", null);
__decorate([
    (0, decorators_1.Access)(decorators_1.ROLE.TRAINEE, decorators_1.ROLE.TRAINER, decorators_1.ROLE.ADMIN),
    (0, common_1.Get)(),
    __param(0, (0, ProfileAtuh_decorator_1.ProfileAuth)()),
    __param(1, (0, common_1.Query)('traineeId')),
    __param(2, (0, common_1.Query)('planId')),
    __param(3, (0, common_1.Query)('trainId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", void 0)
], ExerciseController.prototype, "findAll", null);
__decorate([
    (0, decorators_1.Access)(decorators_1.ROLE.TRAINEE, decorators_1.ROLE.TRAINER, decorators_1.ROLE.ADMIN),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, ProfileAtuh_decorator_1.ProfileAuth)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ExerciseController.prototype, "findOne", null);
__decorate([
    (0, decorators_1.Access)(decorators_1.ROLE.TRAINEE, decorators_1.ROLE.TRAINER, decorators_1.ROLE.ADMIN),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, ProfileAtuh_decorator_1.ProfileAuth)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_exercise_dto_1.UpdateExerciseDto, Object]),
    __metadata("design:returntype", void 0)
], ExerciseController.prototype, "update", null);
__decorate([
    (0, decorators_1.Access)(decorators_1.ROLE.TRAINEE, decorators_1.ROLE.TRAINER, decorators_1.ROLE.ADMIN),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, ProfileAtuh_decorator_1.ProfileAuth)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ExerciseController.prototype, "remove", null);
exports.ExerciseController = ExerciseController = __decorate([
    (0, common_1.UseGuards)(guards_1.AuthGuard, guards_1.RoleGuard),
    (0, common_1.Controller)('exercise'),
    __metadata("design:paramtypes", [exercise_service_1.ExerciseService])
], ExerciseController);
//# sourceMappingURL=exercise.controller.js.map