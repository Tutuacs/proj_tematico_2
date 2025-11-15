import { PrismaService } from 'src/prisma/prisma.service';
export declare class TrainFunctionsService extends PrismaService {
    createTrain(data: any): Promise<{
        id: string;
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
        from: Date;
        to: Date;
    }>;
    getAllTrains(): Promise<{
        id: string;
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
        from: Date;
        to: Date;
        Exercise: {
            id: string;
            weight: number | null;
            description: string | null;
            Activity: {
                name: string;
                id: string;
                weight: number | null;
                ACTIVITY_TYPE: import("@prisma/client").$Enums.ACTIVITY_TYPE;
                reps: number | null;
                sets: number | null;
                duration: number | null;
            };
            reps: number | null;
            sets: number | null;
            duration: number | null;
        }[];
        weekDay: import("@prisma/client").$Enums.WEEK_DAYS;
    }[]>;
    getTrainById(id: string): Promise<{
        id: string;
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
        from: Date;
        to: Date;
        Exercise: {
            id: string;
            weight: number | null;
            description: string | null;
            Activity: {
                name: string;
                id: string;
                weight: number | null;
                description: string | null;
                ACTIVITY_TYPE: import("@prisma/client").$Enums.ACTIVITY_TYPE;
                reps: number | null;
                sets: number | null;
                duration: number | null;
            };
            reps: number | null;
            sets: number | null;
            duration: number | null;
        }[];
        weekDay: import("@prisma/client").$Enums.WEEK_DAYS;
    } | null>;
    getTrainsByTrainer(trainerId: string): Promise<{
        id: string;
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
        from: Date;
        to: Date;
        Exercise: {
            id: string;
            weight: number | null;
            reps: number | null;
            sets: number | null;
            duration: number | null;
        }[];
    }[]>;
    getTrainsByPlan(planId: string): Promise<{
        id: string;
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
        from: Date;
        to: Date;
        Exercise: {
            id: string;
            weight: number | null;
            description: string | null;
            Activity: {
                name: string;
                id: string;
                description: string | null;
                ACTIVITY_TYPE: import("@prisma/client").$Enums.ACTIVITY_TYPE;
            };
            reps: number | null;
            sets: number | null;
            duration: number | null;
        }[];
        weekDay: import("@prisma/client").$Enums.WEEK_DAYS;
    }[]>;
    getTrainsByTrainee(traineeId: string): Promise<{
        id: string;
        planId: string;
        Plan: {
            id: string;
            title: string;
            description: string | null;
        };
        from: Date;
        to: Date;
        Exercise: {
            id: string;
            weight: number | null;
            description: string | null;
            Activity: {
                name: string;
                id: string;
                weight: number | null;
                description: string | null;
                ACTIVITY_TYPE: import("@prisma/client").$Enums.ACTIVITY_TYPE;
                reps: number | null;
                sets: number | null;
                duration: number | null;
            };
            reps: number | null;
            sets: number | null;
            duration: number | null;
        }[];
        weekDay: import("@prisma/client").$Enums.WEEK_DAYS;
    }[]>;
    updateTrain(id: string, data: any): Promise<{
        id: string;
        planId: string;
        from: Date;
        to: Date;
    }>;
    deleteTrain(id: string): Promise<{
        id: string;
        planId: string;
        from: Date;
        to: Date;
        weekDay: import("@prisma/client").$Enums.WEEK_DAYS;
    }>;
    verifyPlanOwnership(planId: string, traineeId: string): Promise<boolean>;
    verifyTrainerPlanAccess(planId: string, trainerId: string): Promise<boolean>;
    existTrainById(id: string): Promise<{
        id: string;
    } | null>;
}
