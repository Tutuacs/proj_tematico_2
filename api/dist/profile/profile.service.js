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
exports.ProfileService = void 0;
const common_1 = require("@nestjs/common");
const profile_functions_service_1 = require("./profile-functions/profile-functions.service");
const decorators_1 = require("../decorators");
let ProfileService = class ProfileService {
    profileFunctions;
    constructor(profileFunctions) {
        this.profileFunctions = profileFunctions;
    }
    async create(createProfileDto) {
        const exist = await this.profileFunctions.existProfileEmail(createProfileDto.email);
        if (exist) {
            throw new common_1.ConflictException('Email já está em uso por outro usuário');
        }
        return this.profileFunctions.createProfile(createProfileDto);
    }
    async findAll(profile) {
        if (profile.role != decorators_1.ROLE.ADMIN) {
            if (profile.role == decorators_1.ROLE.TRAINER) {
                return this.profileFunctions.getAllProfilesTrainer(profile.id);
            }
            return this.profileFunctions.getProfileById(profile.id);
        }
        return this.profileFunctions.getAllProfiles();
    }
    async findOne(id, profile) {
        const found = await this.profileFunctions.getProfileById(id);
        if (!found) {
            throw new common_1.NotFoundException('Perfil não encontrado');
        }
        if (profile.role != decorators_1.ROLE.ADMIN) {
            if (profile.role == decorators_1.ROLE.TRAINER) {
                if (found.trainerId !== null && found.trainerId !== profile.id && found.id !== profile.id) {
                    throw new common_1.NotFoundException('Perfil não encontrado');
                }
                return found;
            }
            if (found.id !== profile.id) {
                throw new common_1.NotFoundException('Perfil não encontrado');
            }
        }
        return found;
    }
    async update(id, updateProfileDto, profile) {
        const found = await this.profileFunctions.getProfileById(id);
        if (!found) {
            throw new common_1.NotFoundException('Perfil não encontrado');
        }
        if (profile.role != decorators_1.ROLE.ADMIN) {
            if (profile.role == decorators_1.ROLE.TRAINER) {
                if (found.trainerId !== null && found.trainerId !== profile.id && found.id !== profile.id) {
                    throw new common_1.NotFoundException('Perfil não encontrado');
                }
                if (updateProfileDto.role !== undefined) {
                    const { role, ...allowedUpdates } = updateProfileDto;
                    updateProfileDto = allowedUpdates;
                }
            }
            else {
                if (found.id !== profile.id) {
                    throw new common_1.NotFoundException('Perfil não encontrado');
                }
                const { role, trainerId, ...allowedUpdates } = updateProfileDto;
                updateProfileDto = allowedUpdates;
            }
        }
        else {
            if (profile.id === id && updateProfileDto.role !== undefined && updateProfileDto.role !== found.role) {
                throw new common_1.ConflictException('Você não pode alterar sua própria role por segurança');
            }
        }
        if (updateProfileDto.email) {
            const emailInUse = await this.profileFunctions.existProfileEmail(updateProfileDto.email);
            if (emailInUse && emailInUse.id !== id) {
                throw new common_1.ConflictException('Email já está em uso por outro usuário');
            }
        }
        return this.profileFunctions.updateProfile(id, updateProfileDto);
    }
    async remove(id, profile) {
        const found = await this.profileFunctions.getProfileById(id);
        if (!found) {
            throw new common_1.NotFoundException('Perfil não encontrado');
        }
        if (profile.role != decorators_1.ROLE.ADMIN) {
            throw new common_1.NotFoundException('Perfil não encontrado');
        }
        return this.profileFunctions.deleteProfile(id);
    }
    async getTraineesByTrainer(trainerId) {
        const trainer = await this.profileFunctions.existProfileById(trainerId);
        if (!trainer) {
            throw new common_1.NotFoundException('Treinador não encontrado');
        }
        return this.profileFunctions.getTraineesByTrainer(trainerId);
    }
};
exports.ProfileService = ProfileService;
exports.ProfileService = ProfileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [profile_functions_service_1.ProfileFunctionsService])
], ProfileService);
//# sourceMappingURL=profile.service.js.map