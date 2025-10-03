import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileFunctionsService } from './profile-functions/profile-functions.service';
import { ROLE } from 'src/decorators';

@Injectable()
export class ProfileService {
  constructor(private readonly profileFunctions: ProfileFunctionsService) {}

  async create(createProfileDto: CreateProfileDto) {
    const exist = await this.profileFunctions.existProfileEmail(
      createProfileDto.email,
    );
    if (exist) {
      throw new ConflictException('Email já está em uso por outro usuário');
    }
    return this.profileFunctions.createProfile(createProfileDto);
  }

  async findAll(profile: {
    id: string;
    email: string;
    role: number;
    name: string;
  }) {
    if (profile.role != ROLE.ADMIN) {
      if (profile.role == ROLE.TRAINER) {
        return this.profileFunctions.getAllProfilesTrainer(profile.id);
      }
      return this.profileFunctions.getProfileById(profile.id)
    }

    return this.profileFunctions.getAllProfiles();
  }

  async findOne(
    id: string,
    profile: {
      id: string;
      email: string;
      role: number;
      name: string;
    },
  ) {
    const found = await this.profileFunctions.getProfileById(id);
    if (!found) {
      throw new NotFoundException('Perfil não encontrado');
    }

    if (profile.role != ROLE.ADMIN) {
      if (profile.role == ROLE.TRAINER) {
        if (found.trainerId !== null && found.trainerId !== profile.id && found.id !== profile.id) {
          throw new NotFoundException('Perfil não encontrado');
        }
        return found;
      }
      if (found.id !== profile.id) {
        throw new NotFoundException('Perfil não encontrado');
      }
    }

    return found;
  }

  async update(
    id: string,
    updateProfileDto: UpdateProfileDto,
    profile: {
      id: string;
      email: string;
      role: number;
      name: string;
    },
  ) {
    const found = await this.profileFunctions.getProfileById(id);
    if (!found) {
      throw new NotFoundException('Perfil não encontrado');
    }

    // Check role permissions
    if (profile.role != ROLE.ADMIN) {
      if (profile.role == ROLE.TRAINER) {
        if (found.trainerId !== null && found.trainerId !== profile.id && found.id !== profile.id) {
          throw new NotFoundException('Perfil não encontrado');
        }
        // TRAINER cannot change role or trainerId
        const { role, trainerId, ...allowedUpdates } = updateProfileDto;
        updateProfileDto = allowedUpdates as UpdateProfileDto;
      } else {
        // TRAINEE can only update their own profile
        if (found.id !== profile.id) {
          throw new NotFoundException('Perfil não encontrado');
        }
        // TRAINEE cannot change role or trainerId
        const { role, trainerId, ...allowedUpdates } = updateProfileDto;
        updateProfileDto = allowedUpdates as UpdateProfileDto;
      }
    }

    // Check if email is being updated and if it's already in use
    if (updateProfileDto.email) {
      const emailInUse = await this.profileFunctions.existProfileEmail(
        updateProfileDto.email,
      );
      if (emailInUse && emailInUse.id !== id) {
        throw new ConflictException('Email já está em uso por outro usuário');
      }
    }

    return this.profileFunctions.updateProfile(id, updateProfileDto);
  }

  async remove(
    id: string,
    profile: {
      id: string;
      email: string;
      role: number;
      name: string;
    },
  ) {
    const found = await this.profileFunctions.getProfileById(id);
    if (!found) {
      throw new NotFoundException('Perfil não encontrado');
    }

    // Only ADMIN can delete profiles
    if (profile.role != ROLE.ADMIN) {
      throw new NotFoundException('Perfil não encontrado');
    }

    return this.profileFunctions.deleteProfile(id);
  }

  async getTraineesByTrainer(trainerId: string) {
    // Check if trainer exists
    const trainer = await this.profileFunctions.existProfileById(trainerId);
    if (!trainer) {
      throw new NotFoundException('Treinador não encontrado');
    }

    return this.profileFunctions.getTraineesByTrainer(trainerId);
  }
}
