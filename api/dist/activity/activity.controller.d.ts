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
        weight: number | null;
        planId: string;
        Plan: {
            id: string;
            trainerId: string;
            Trainee: {
                email: string;
                name: string | null;
                id: string;
            };
            title: string;
            traineeId: string;
        };
        description: string | null;
        ACTIVITY_TYPE: import("@prisma/client").$Enums.ACTIVITY_TYPE;
        reps: number | null;
        sets: number | null;
        duration: number | null;
    }>;
    findAll(profile: {
        id: string;
        email: string;
        role: number;
        name: string;
    }): Promise<{
        name: string;
        id: string;
        weight: number | null;
        planId: string;
        Plan: {
            id: string;
            Trainee: {
                email: string;
                name: string | null;
                id: string;
            };
            title: string;
            traineeId: string;
        };
        description: string | null;
        ACTIVITY_TYPE: import("@prisma/client").$Enums.ACTIVITY_TYPE;
        reps: number | null;
        sets: number | null;
        duration: number | null;
        Exercise: {
            id: string;
            weight: number | null;
            reps: number | null;
            sets: number | null;
            duration: number | null;
        }[];
    }[] | {
        name: string;
        id: string;
        weight: number | null;
        planId: string;
        Plan: {
            id: string;
            title: string;
            description: string | null;
        };
        description: string | null;
        ACTIVITY_TYPE: import("@prisma/client").$Enums.ACTIVITY_TYPE;
        reps: number | null;
        sets: number | null;
        duration: number | null;
        Exercise: {
            id: string;
            weight: number | null;
            description: string | null;
            Train: {
                id: string;
                from: Date;
                to: Date;
            };
            reps: number | null;
            sets: number | null;
            duration: number | null;
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
        weight: number | null;
        planId: string;
        Plan: {
            id: string;
            trainerId: string;
            Trainee: {
                email: string;
                name: string | null;
                id: string;
            };
            title: string;
            traineeId: string;
        };
        description: string | null;
        ACTIVITY_TYPE: import("@prisma/client").$Enums.ACTIVITY_TYPE;
        reps: number | null;
        sets: number | null;
        duration: number | null;
        Exercise: {
            id: string;
            weight: number | null;
            description: string | null;
            Train: {
                id: string;
                from: Date;
                to: Date;
            };
            reps: number | null;
            sets: number | null;
            duration: number | null;
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
        weight: number | null;
        planId: string;
        description: string | null;
        ACTIVITY_TYPE: import("@prisma/client").$Enums.ACTIVITY_TYPE;
        reps: number | null;
        sets: number | null;
        duration: number | null;
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
