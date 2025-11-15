"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BodyPartModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("../prisma/prisma.module");
const body_part_service_1 = require("./body-part.service");
const body_part_controller_1 = require("./body-part.controller");
const body_part_functions_service_1 = require("./body-part-functions/body-part-functions.service");
const auth_module_1 = require("../auth/auth.module");
let BodyPartModule = class BodyPartModule {
};
exports.BodyPartModule = BodyPartModule;
exports.BodyPartModule = BodyPartModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, auth_module_1.AuthModule],
        controllers: [body_part_controller_1.BodyPartController],
        providers: [body_part_service_1.BodyPartService, body_part_functions_service_1.BodyPartFunctionsService],
    })
], BodyPartModule);
//# sourceMappingURL=body-part.module.js.map