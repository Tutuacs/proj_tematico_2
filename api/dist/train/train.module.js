"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainModule = void 0;
const common_1 = require("@nestjs/common");
const train_service_1 = require("./train.service");
const train_controller_1 = require("./train.controller");
const train_functions_service_1 = require("./train-functions/train-functions.service");
const prisma_module_1 = require("../prisma/prisma.module");
const auth_module_1 = require("../auth/auth.module");
let TrainModule = class TrainModule {
};
exports.TrainModule = TrainModule;
exports.TrainModule = TrainModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, auth_module_1.AuthModule],
        controllers: [train_controller_1.TrainController],
        providers: [train_service_1.TrainService, train_functions_service_1.TrainFunctionsService],
    })
], TrainModule);
//# sourceMappingURL=train.module.js.map