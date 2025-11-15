import { PrismaService } from 'src/prisma/prisma.service';
export declare class ActivityFunctionsService extends PrismaService {
    createActivity(data: any): Promise<{
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
    getAllActivities(): Promise<{
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
            reps: number;
            sets: number;
            duration: number;
        }[];
    }[]>;
    getActivityById(id: string): Promise<{
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
    getActivitiesByTrainer(trainerId: string): Promise<{
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
    }[]>;
    getActivitiesByTrainee(traineeId: string): Promise<{
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
    updateActivity(id: string, data: any): Promise<{
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
    deleteActivity(id: string): Promise<{
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
    verifyPlanOwnership(planId: string, traineeId: string): Promise<boolean>;
    verifyTrainerPlanAccess(planId: string, trainerId: string): Promise<boolean>;
    existActivityById(id: string): Promise<{
        id: string;
    }>;
}
