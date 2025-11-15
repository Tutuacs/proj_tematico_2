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
exports.BodyPartController = void 0;
const common_1 = require("@nestjs/common");
const body_part_service_1 = require("./body-part.service");
const create_body_part_dto_1 = require("./dto/create-body-part.dto");
const update_body_part_dto_1 = require("./dto/update-body-part.dto");
const guards_1 = require("../guards");
const decorators_1 = require("../decorators");
const ProfileAtuh_decorator_1 = require("../decorators/ProfileAtuh.decorator");
let BodyPartController = class BodyPartController {
    constructor(bodyPartService) {
        this.bodyPartService = bodyPartService;
    }
    create(createBodyPartDto, profile) {
        return this.bodyPartService.create(createBodyPartDto, profile);
    }
    findAll(profile, reportId) {
        return this.bodyPartService.findAll(profile, { reportId });
    }
    findOne(id, profile) {
        return this.bodyPartService.findOne(id, profile);
    }
    update(id, updateBodyPartDto, profile) {
        return this.bodyPartService.update(id, updateBodyPartDto, profile);
    }
    remove(id, profile) {
        return this.bodyPartService.remove(id, profile);
    }
};
exports.BodyPartController = BodyPartController;
__decorate([
    (0, decorators_1.Access)(decorators_1.ROLE.TRAINER, decorators_1.ROLE.ADMIN),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, ProfileAtuh_decorator_1.ProfileAuth)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_body_part_dto_1.CreateBodyPartDto, Object]),
    __metadata("design:returntype", void 0)
], BodyPartController.prototype, "create", null);
__decorate([
    (0, decorators_1.Access)(decorators_1.ROLE.TRAINEE, decorators_1.ROLE.TRAINER, decorators_1.ROLE.ADMIN),
    (0, common_1.Get)(),
    __param(0, (0, ProfileAtuh_decorator_1.ProfileAuth)()),
    __param(1, (0, common_1.Query)('reportId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], BodyPartController.prototype, "findAll", null);
__decorate([
    (0, decorators_1.Access)(decorators_1.ROLE.TRAINEE, decorators_1.ROLE.TRAINER, decorators_1.ROLE.ADMIN),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, ProfileAtuh_decorator_1.ProfileAuth)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], BodyPartController.prototype, "findOne", null);
__decorate([
    (0, decorators_1.Access)(decorators_1.ROLE.TRAINER, decorators_1.ROLE.ADMIN),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, ProfileAtuh_decorator_1.ProfileAuth)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_body_part_dto_1.UpdateBodyPartDto, Object]),
    __metadata("design:returntype", void 0)
], BodyPartController.prototype, "update", null);
__decorate([
    (0, decorators_1.Access)(decorators_1.ROLE.TRAINER, decorators_1.ROLE.ADMIN),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, ProfileAtuh_decorator_1.ProfileAuth)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], BodyPartController.prototype, "remove", null);
exports.BodyPartController = BodyPartController = __decorate([
    (0, common_1.UseGuards)(guards_1.AuthGuard, guards_1.RoleGuard),
    (0, common_1.Controller)('body-part'),
    __metadata("design:paramtypes", [body_part_service_1.BodyPartService])
], BodyPartController);
//# sourceMappingURL=body-part.controller.js.map