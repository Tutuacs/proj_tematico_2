import { PrismaService } from 'src/prisma/prisma.service';
export declare class ActivityFunctionsService extends PrismaService {
    createActivity(data: any): Promise<{
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
    getAllActivities(): Promise<{
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
            reps: number | null;
            sets: number | null;
            duration: number | null;
        }[];
    }[]>;
    getActivityById(id: string): Promise<{
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
    } | null>;
    getActivitiesByTrainer(trainerId: string): Promise<{
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
    }[]>;
    getActivitiesByTrainee(traineeId: string): Promise<{
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
    updateActivity(id: string, data: any): Promise<{
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
    } | null>;
}
