import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileFunctionsService } from './profile-functions/profile-functions.service';
export declare class ProfileService {
    private readonly profileFunctions;
    constructor(profileFunctions: ProfileFunctionsService);
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
    getTraineesByTrainer(trainerId: string): Promise<{
        email: string;
        name: string | null;
        role: number;
        id: string;
    }[]>;
}
