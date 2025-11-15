import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
export declare class ActivityController {
    private readonly activityService;
    constructor(activityService: ActivityService);
    create(createActivityDto: CreateActivityDto, profile: {
        id: string;
        email: string;
        role: number;
        name: string;
    }): Promise<{
        name: string;
        id: string;
        weight: number;
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
        description: string;
        ACTIVITY_TYPE: import("@prisma/client").$Enums.ACTIVITY_TYPE;
        reps: number;
        sets: number;
        duration: number;
    }>;
    findAll(profile: {
        id: string;
        email: string;
        role: number;
        name: string;
    }): Promise<{
        name: string;
        id: string;
        weight: number;
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
        description: string;
        ACTIVITY_TYPE: import("@prisma/client").$Enums.ACTIVITY_TYPE;
        reps: number;
        sets: number;
        duration: number;
        Exercise: {
            id: string;
            weight: number;
            reps: number;
            sets: number;
            duration: number;
        }[];
    }[] | {
        name: string;
        id: string;
        weight: number;
        planId: string;
        Plan: {
            id: string;
            title: string;
            description: string;
        };
        description: string;
        ACTIVITY_TYPE: import("@prisma/client").$Enums.ACTIVITY_TYPE;
        reps: number;
        sets: number;
        duration: number;
        Exercise: {
            id: string;
            weight: number;
            description: string;
            Train: {
                id: string;
                from: Date;
                to: Date;
            };
            reps: number;
            sets: number;
            duration: number;
        }[];
    }[]>;
    findOne(id: string, profile: {
        id: string;
        email: string;
        role: number;
        name: string;
    }): Promise<{
        name: string;
        id: string;
        weight: number;
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
        description: string;
        ACTIVITY_TYPE: import("@prisma/client").$Enums.ACTIVITY_TYPE;
        reps: number;
        sets: number;
        duration: number;
        Exercise: {
            id: string;
            weight: number;
            description: string;
            Train: {
                id: string;
                from: Date;
                to: Date;
            };
            reps: number;
            sets: number;
            duration: number;
        }[];
    }>;
    update(id: string, updateActivityDto: UpdateActivityDto, profile: {
        id: string;
        email: string;
        role: number;
        name: string;
    }): Promise<{
        name: string;
        id: string;
        weight: number;
        planId: string;
        description: string;
        ACTIVITY_TYPE: import("@prisma/client").$Enums.ACTIVITY_TYPE;
        reps: number;
        sets: number;
        duration: number;
    }>;
    remove(id: string, profile: {
        id: string;
        email: string;
        role: number;
        name: string;
    }): Promise<{
        name: string;
        id: string;
        weight: number | null;
        planId: string;
        description: string | null;
        ACTIVITY_TYPE: import("@prisma/client").$Enums.ACTIVITY_TYPE;
        reps: number | null;
        sets: number | null;
        duration: number | null;
    }>;
}
