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
exports.TrainController = void 0;
const common_1 = require("@nestjs/common");
const train_service_1 = require("./train.service");
const create_train_dto_1 = require("./dto/create-train.dto");
const update_train_dto_1 = require("./dto/update-train.dto");
const guards_1 = require("../guards");
const decorators_1 = require("../decorators");
const ProfileAtuh_decorator_1 = require("../decorators/ProfileAtuh.decorator");
let TrainController = class TrainController {
    constructor(trainService) {
        this.trainService = trainService;
    }
    create(createTrainDto, profile) {
        return this.trainService.create(createTrainDto, profile);
    }
    findAll(profile, planId) {
        return this.trainService.findAll(profile, { planId });
    }
    findOne(id, profile) {
        return this.trainService.findOne(id, profile);
    }
    update(id, updateTrainDto, profile) {
        return this.trainService.update(id, updateTrainDto, profile);
    }
    remove(id, profile) {
        return this.trainService.remove(id, profile);
    }
};
exports.TrainController = TrainController;
__decorate([
    (0, decorators_1.Access)(decorators_1.ROLE.TRAINEE, decorators_1.ROLE.TRAINER, decorators_1.ROLE.ADMIN),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, ProfileAtuh_decorator_1.ProfileAuth)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_train_dto_1.CreateTrainDto, Object]),
    __metadata("design:returntype", void 0)
], TrainController.prototype, "create", null);
__decorate([
    (0, decorators_1.Access)(decorators_1.ROLE.TRAINEE, decorators_1.ROLE.TRAINER, decorators_1.ROLE.ADMIN),
    (0, common_1.Get)(),
    __param(0, (0, ProfileAtuh_decorator_1.ProfileAuth)()),
    __param(1, (0, common_1.Query)('planId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], TrainController.prototype, "findAll", null);
__decorate([
    (0, decorators_1.Access)(decorators_1.ROLE.TRAINEE, decorators_1.ROLE.TRAINER, decorators_1.ROLE.ADMIN),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, ProfileAtuh_decorator_1.ProfileAuth)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TrainController.prototype, "findOne", null);
__decorate([
    (0, decorators_1.Access)(decorators_1.ROLE.TRAINEE, decorators_1.ROLE.TRAINER, decorators_1.ROLE.ADMIN),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, ProfileAtuh_decorator_1.ProfileAuth)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_train_dto_1.UpdateTrainDto, Object]),
    __metadata("design:returntype", void 0)
], TrainController.prototype, "update", null);
__decorate([
    (0, decorators_1.Access)(decorators_1.ROLE.TRAINEE, decorators_1.ROLE.TRAINER, decorators_1.ROLE.ADMIN),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, ProfileAtuh_decorator_1.ProfileAuth)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TrainController.prototype, "remove", null);
exports.TrainController = TrainController = __decorate([
    (0, common_1.UseGuards)(guards_1.AuthGuard, guards_1.RoleGuard),
    (0, common_1.Controller)('train'),
    __metadata("design:paramtypes", [train_service_1.TrainService])
], TrainController);
//# sourceMappingURL=train.controller.js.map