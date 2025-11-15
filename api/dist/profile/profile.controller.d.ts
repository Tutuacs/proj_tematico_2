import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
export declare class ProfileController {
    private readonly profileService;
    constructor(profileService: ProfileService);
    create(createProfileDto: CreateProfileDto): Promise<{
        email: string;
        password: string;
        name: string | null;
        role: number;
        id: string;
        trainerId: string | null;
    }>;
    findAll(profile: {
        id: string;
        email: string;
        role: number;
        name: string;
    }): Promise<{
        email: string;
        password: string;
        name: string | null;
        role: number;
        id: string;
        trainerId: string | null;
    } | ({
        Trainer: {
            email: string;
            name: string | null;
            id: string;
        } | null;
    } & {
        email: string;
        password: string;
        name: string | null;
        role: number;
        id: string;
        trainerId: string | null;
    })[] | null>;
    findOne(id: string, profile: {
        id: string;
        email: string;
        role: number;
        name: string;
    }): Promise<{
        email: string;
        password: string;
        name: string | null;
        role: number;
        id: string;
        trainerId: string | null;
    }>;
    update(id: string, updateProfileDto: UpdateProfileDto, profile: {
        id: string;
        email: string;
        role: number;
        name: string;
    }): Promise<{
        email: string;
        password: string;
        name: string | null;
        role: number;
        id: string;
        trainerId: string | null;
    }>;
    remove(id: string, profile: {
        id: string;
        email: string;
        role: number;
        name: string;
    }): Promise<{
        email: string;
        password: string;
        name: string | null;
        role: number;
        id: string;
        trainerId: string | null;
    }>;
}
