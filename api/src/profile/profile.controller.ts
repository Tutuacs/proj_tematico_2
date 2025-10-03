import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AuthGuard, RoleGuard } from 'src/guards';
import { Access, ROLE } from 'src/decorators';
import { ProfileAuth } from 'src/decorators/ProfileAtuh.decorator';

@UseGuards(AuthGuard, RoleGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Access(ROLE.ADMIN)
  @Post()
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.profileService.create(createProfileDto);
  }

  @Access(ROLE.TRAINEE, ROLE.TRAINER, ROLE.ADMIN)
  @Get()
  findAll(
    @ProfileAuth()
    profile: {
      id: string;
      email: string;
      role: number;
      name: string;
    },
  ) {
    return this.profileService.findAll(profile);
  }

  @Access(ROLE.TRAINEE, ROLE.TRAINER, ROLE.ADMIN)
  @Get(':id')
  findOne(
    @Param('id') id: string,
    @ProfileAuth()
    profile: {
      id: string;
      email: string;
      role: number;
      name: string;
    },
  ) {
    return this.profileService.findOne(id, profile);
  }

  @Access(ROLE.TRAINEE, ROLE.TRAINER, ROLE.ADMIN)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProfileDto: UpdateProfileDto,
    @ProfileAuth()
    profile: {
      id: string;
      email: string;
      role: number;
      name: string;
    },
  ) {
    return this.profileService.update(id, updateProfileDto, profile);
  }

  @Access(ROLE.ADMIN)
  @Delete(':id')
  remove(
    @Param('id') id: string,
    @ProfileAuth()
    profile: {
      id: string;
      email: string;
      role: number;
      name: string;
    },
  ) {
    return this.profileService.remove(id, profile);
  }
}
