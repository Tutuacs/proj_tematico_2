import { PrismaService } from 'src/prisma/prisma.service';
export declare class PlanFunctionsService extends PrismaService {
    createPlan(data: any): Promise<{
        id: string;
        trainerId: string;
        title: string;
        description: string | null;
        from: Date;
        to: Date;
        traineeId: string;
    }>;
    getAllPlans(): Promise<{
        id: string;
        trainerId: string;
        Trainee: {
            email: string;
            name: string | null;
            id: string;
        };
        Trainer: {
            email: string;
            name: string | null;
            id: string;
        };
        title: string;
        description: string | null;
        from: Date;
        to: Date;
        traineeId: string;
    }[]>;
    getPlanById(id: string): Promise<{
        id: string;
        trainerId: string;
        Trainee: {
            email: string;
            name: string | null;
            id: string;
        };
        Trainer: {
            email: string;
            name: string | null;
            id: string;
        };
        title: string;
        description: string | null;
        from: Date;
        to: Date;
        traineeId: string;
        Activity: {
            name: string;
            id: string;
            weight: number | null;
            description: string | null;
            ACTIVITY_TYPE: import("@prisma/client").$Enums.ACTIVITY_TYPE;
            reps: number | null;
            sets: number | null;
            duration: number | null;
        }[];
        Train: {
            id: string;
            from: Date;
            to: Date;
            weekDay: import("@prisma/client").$Enums.WEEK_DAYS;
        }[];
    } | null>;
    getPlansWithFilters(filters: {
        traineeId?: string;
        trainerId?: string;
        active?: string;
    }): Promise<{
        id: string;
        trainerId: string;
        Trainee: {
            email: string;
            name: string | null;
            id: string;
        };
        Trainer: {
            email: string;
            name: string | null;
            id: string;
        };
        title: string;
        description: string | null;
        from: Date;
        to: Date;
        traineeId: string;
    }[]>;
    getPlansByTrainer(trainerId: string, filterTraineeId?: string): Promise<{
        id: string;
        trainerId: string;
        Trainee: {
            email: string;
            name: string | null;
            id: string;
        };
        title: string;
        description: string | null;
        from: Date;
        to: Date;
        traineeId: string;
        Train: {
            id: string;
            weekDay: import("@prisma/client").$Enums.WEEK_DAYS;
        }[];
    }[]>;
    getPlansByTrainee(traineeId: string): Promise<{
        id: string;
        trainerId: string;
        Trainer: {
            email: string;
            name: string | null;
            id: string;
        };
        title: string;
        description: string | null;
        from: Date;
        to: Date;
        traineeId: string;
        Activity: {
            name: string;
            id: string;
            weight: number | null;
            description: string | null;
            ACTIVITY_TYPE: import("@prisma/client").$Enums.ACTIVITY_TYPE;
            reps: number | null;
            sets: number | null;
            duration: number | null;
        }[];
        Train: {
            id: string;
            from: Date;
            to: Date;
            weekDay: import("@prisma/client").$Enums.WEEK_DAYS;
        }[];
    }[]>;
    updatePlan(id: string, data: any): Promise<{
        id: string;
        trainerId: string;
        title: string;
        description: string | null;
        from: Date;
        to: Date;
        traineeId: string;
    }>;
    deletePlan(id: string): Promise<{
        id: string;
        trainerId: string;
        title: string;
        description: string | null;
        from: Date;
        to: Date;
        traineeId: string;
    }>;
    existPlanById(id: string): Promise<{
        id: string;
    } | null>;
    createActivitiesForPlan(planId: string, activities: any[]): Promise<import("@prisma/client").Prisma.BatchPayload>;
    deleteActivity(activityId: string): Promise<{
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
