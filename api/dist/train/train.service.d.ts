import { CreateTrainDto } from './dto/create-train.dto';
import { UpdateTrainDto } from './dto/update-train.dto';
import { TrainFunctionsService } from './train-functions/train-functions.service';
export declare class TrainService {
    private readonly trainFunctions;
    constructor(trainFunctions: TrainFunctionsService);
    create(createTrainDto: CreateTrainDto, profile: {
        id: string;
        email: string;
        role: number;
        name: string;
    }): Promise<{
        id: string;
        planId: string;
        Plan: {
            id: string;
            trainerId: string;
            Trainee: {
                email: string;
                name: string;
                id: string;
            };
            title: string;
            traineeId: string;
        };
        from: Date;
        to: Date;
    }>;
    findAll(profile: {
        id: string;
        email: string;
        role: number;
        name: string;
    }, filters?: {
        planId?: string;
    }): Promise<{
        id: string;
        planId: string;
        Plan: {
            id: string;
            Trainee: {
                email: string;
                name: string;
                id: string;
            };
            title: string;
            traineeId: string;
        };
        from: Date;
        to: Date;
        Exercise: {
            id: string;
            weight: number;
            reps: number;
            sets: number;
            duration: number;
        }[];
    }[] | {
        id: string;
        planId: string;
        Plan: {
            id: string;
            title: string;
            description: string;
        };
        from: Date;
        to: Date;
        Exercise: {
            id: string;
            weight: number;
            description: string;
            Activity: {
                name: string;
                id: string;
                weight: number;
                description: string;
                ACTIVITY_TYPE: import("@prisma/client").$Enums.ACTIVITY_TYPE;
                reps: number;
                sets: number;
                duration: number;
            };
            reps: number;
            sets: number;
            duration: number;
        }[];
        weekDay: import("@prisma/client").$Enums.WEEK_DAYS;
    }[]>;
    findOne(id: string, profile: {
        id: string;
        email: string;
        role: number;
        name: string;
    }): Promise<{
        id: string;
        planId: string;
        Plan: {
            id: string;
            trainerId: string;
            Trainee: {
                email: string;
                name: string;
                id: string;
            };
            title: string;
            traineeId: string;
        };
        from: Date;
        to: Date;
        Exercise: {
            id: string;
            weight: number;
            description: string;
            Activity: {
                name: string;
                id: string;
                weight: number;
                description: string;
                ACTIVITY_TYPE: import("@prisma/client").$Enums.ACTIVITY_TYPE;
                reps: number;
                sets: number;
                duration: number;
            };
            reps: number;
            sets: number;
            duration: number;
        }[];
        weekDay: import("@prisma/client").$Enums.WEEK_DAYS;
    }>;
    update(id: string, updateTrainDto: UpdateTrainDto, profile: {
        id: string;
        email: string;
        role: number;
        name: string;
    }): Promise<{
        id: string;
        planId: string;
        from: Date;
        to: Date;
    }>;
    remove(id: string, profile: {
        id: string;
        email: string;
        role: number;
        name: string;
    }): Promise<{
        id: string;
        planId: string;
        from: Date;
        to: Date;
        weekDay: import("@prisma/client").$Enums.WEEK_DAYS;
    }>;
}
