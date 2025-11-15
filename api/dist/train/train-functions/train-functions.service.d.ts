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
                name: string;
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
    getTrainById(id: string): Promise<{
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
    getTrainsByTrainer(trainerId: string): Promise<{
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
    }[]>;
    getTrainsByPlan(planId: string): Promise<{
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
                description: string;
                ACTIVITY_TYPE: import("@prisma/client").$Enums.ACTIVITY_TYPE;
            };
            reps: number;
            sets: number;
            duration: number;
        }[];
        weekDay: import("@prisma/client").$Enums.WEEK_DAYS;
    }[]>;
    getTrainsByTrainee(traineeId: string): Promise<{
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
    }>;
}
