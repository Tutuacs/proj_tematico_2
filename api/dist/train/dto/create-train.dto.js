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
exports.CreateTrainDto = void 0;
const class_validator_1 = require("class-validator");
var WEEK_DAYS;
(function (WEEK_DAYS) {
    WEEK_DAYS["SUNDAY"] = "SUNDAY";
    WEEK_DAYS["MONDAY"] = "MONDAY";
    WEEK_DAYS["TUESDAY"] = "TUESDAY";
    WEEK_DAYS["WEDNESDAY"] = "WEDNESDAY";
    WEEK_DAYS["THURSDAY"] = "THURSDAY";
    WEEK_DAYS["FRIDAY"] = "FRIDAY";
    WEEK_DAYS["SATURDAY"] = "SATURDAY";
})(WEEK_DAYS || (WEEK_DAYS = {}));
class CreateTrainDto {
}
exports.CreateTrainDto = CreateTrainDto;
__decorate([
    (0, class_validator_1.IsEnum)(WEEK_DAYS),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateTrainDto.prototype, "weekDay", void 0);
__decorate([
    (0, class_validator_1.IsISO8601)({ strict: true }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateTrainDto.prototype, "from", void 0);
__decorate([
    (0, class_validator_1.IsISO8601)({ strict: true }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateTrainDto.prototype, "to", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateTrainDto.prototype, "planId", void 0);
//# sourceMappingURL=create-train.dto.js.map