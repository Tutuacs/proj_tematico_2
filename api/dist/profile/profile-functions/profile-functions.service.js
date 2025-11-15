"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileFunctionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let ProfileFunctionsService = class ProfileFunctionsService extends prisma_service_1.PrismaService {
    async createProfile(data) {
        return this.profile.create({
            data,
        });
    }
    async getAllProfiles() {
        return this.profile.findMany({
            include: {
                Trainer: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });
    }
    async getAllProfilesTrainer(trainerId) {
        return this.profile.findMany({
            where: {
                OR: [
                    {
                        AND: [
                            { trainerId: trainerId },
                            { role: 0 }
                        ]
                    },
                    {
                        AND: [
                            { trainerId: null },
                            { role: 0 }
                        ]
                    },
                ],
            },
            include: {
                Trainer: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });
    }
    async getProfileById(id) {
        return this.profile.findUnique({
            where: { id },
        });
    }
    async getProfileByEmail(email) {
        return this.profile.findUnique({
            where: { email },
        });
    }
    async updateProfile(id, data) {
        return this.profile.update({
            where: { id },
            data,
        });
    }
    async deleteProfile(id) {
        return this.profile.delete({
            where: { id },
        });
    }
    async existProfileById(id) {
        return this.profile.findUnique({
            where: { id },
            select: { id: true },
        });
    }
    async getTraineesByTrainer(trainerId) {
        return this.profile.findMany({
            where: {
                trainerId: trainerId,
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
            },
        });
    }
};
exports.ProfileFunctionsService = ProfileFunctionsService;
exports.ProfileFunctionsService = ProfileFunctionsService = __decorate([
    (0, common_1.Injectable)()
], ProfileFunctionsService);
//# sourceMappingURL=profile-functions.service.js.map