import { PrismaService } from 'src/prisma/prisma.service';
export declare class ProfileFunctionsService extends PrismaService {
    createProfile(data: any): Promise<{
        email: string;
        password: string;
        name: string | null;
        role: number;
        id: string;
        trainerId: string | null;
    }>;
    getAllProfiles(): Promise<({
        Trainer: {
            email: string;
            name: string;
            id: string;
        };
    } & {
        email: string;
        password: string;
        name: string | null;
        role: number;
        id: string;
        trainerId: string | null;
    })[]>;
    getAllProfilesTrainer(trainerId: string): Promise<({
        Trainer: {
            email: string;
            name: string;
            id: string;
        };
    } & {
        email: string;
        password: string;
        name: string | null;
        role: number;
        id: string;
        trainerId: string | null;
    })[]>;
    getProfileById(id: string): Promise<{
        email: string;
        password: string;
        name: string | null;
        role: number;
        id: string;
        trainerId: string | null;
    }>;
    getProfileByEmail(email: string): Promise<{
        email: string;
        password: string;
        name: string | null;
        role: number;
        id: string;
        trainerId: string | null;
    }>;
    updateProfile(id: string, data: any): Promise<{
        email: string;
        password: string;
        name: string | null;
        role: number;
        id: string;
        trainerId: string | null;
    }>;
    deleteProfile(id: string): Promise<{
        email: string;
        password: string;
        name: string | null;
        role: number;
        id: string;
        trainerId: string | null;
    }>;
    existProfileById(id: string): Promise<{
        id: string;
    }>;
    getTraineesByTrainer(trainerId: string): Promise<{
        email: string;
        name: string;
        role: number;
        id: string;
    }[]>;
}
