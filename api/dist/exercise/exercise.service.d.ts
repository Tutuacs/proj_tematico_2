import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class ExerciseService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createExerciseDto: CreateExerciseDto, profile: {
        id: string;
        role: number;
    }): Promise<{
        Activity: {
            name: string;
            id: string;
            weight: number | null;
            planId: string;
            description: string | null;
            ACTIVITY_TYPE: import("@prisma/client").$Enums.ACTIVITY_TYPE;
            reps: number | null;
            sets: number | null;
            duration: number | null;
        };
        Train: {
            Plan: {
                id: string;
                trainerId: string;
                title: string;
                description: string | null;
                from: Date;
                to: Date;
                traineeId: string;
            };
        } & {
            id: string;
            planId: string;
            from: Date;
            to: Date;
            weekDay: import("@prisma/client").$Enums.WEEK_DAYS;
        };
    } & {
        id: string;
        weight: number | null;
        description: string | null;
        reps: number | null;
        sets: number | null;
        duration: number | null;
        activityId: string;
        trainId: string;
    }>;
    findAll(filters: {
        traineeId?: string;
        planId?: string;
        trainId?: string;
    }, profile: {
        id: string;
        role: number;
    }): Promise<({
        Activity: {
            name: string;
            id: string;
            weight: number | null;
            planId: string;
            description: string | null;
            ACTIVITY_TYPE: import("@prisma/client").$Enums.ACTIVITY_TYPE;
            reps: number | null;
            sets: number | null;
            duration: number | null;
        };
        Train: {
            Plan: {
                Trainee: {
                    email: string;
                    name: string | null;
                    id: string;
                };
            } & {
                id: string;
                trainerId: string;
                title: string;
                description: string | null;
                from: Date;
                to: Date;
                traineeId: string;
            };
        } & {
            id: string;
            planId: string;
            from: Date;
            to: Date;
            weekDay: import("@prisma/client").$Enums.WEEK_DAYS;
        };
    } & {
        id: string;
        weight: number | null;
        description: string | null;
        reps: number | null;
        sets: number | null;
        duration: number | null;
        activityId: string;
        trainId: string;
    })[]>;
    findOne(id: string, profile: {
        id: string;
        role: number;
    }): Promise<{
        Activity: {
            name: string;
            id: string;
            weight: number | null;
            planId: string;
            description: string | null;
            ACTIVITY_TYPE: import("@prisma/client").$Enums.ACTIVITY_TYPE;
            reps: number | null;
            sets: number | null;
            duration: number | null;
        };
        Train: {
            Plan: {
                Trainee: {
                    email: string;
                    name: string | null;
                    id: string;
                };
            } & {
                id: string;
                trainerId: string;
                title: string;
                description: string | null;
                from: Date;
                to: Date;
                traineeId: string;
            };
        } & {
            id: string;
            planId: string;
            from: Date;
            to: Date;
            weekDay: import("@prisma/client").$Enums.WEEK_DAYS;
        };
    } & {
        id: string;
        weight: number | null;
        description: string | null;
        reps: number | null;
        sets: number | null;
        duration: number | null;
        activityId: string;
        trainId: string;
    }>;
    update(id: string, updateExerciseDto: UpdateExerciseDto, profile: {
        id: string;
        role: number;
    }): Promise<{
        Activity: {
            name: string;
            id: string;
            weight: number | null;
            planId: string;
            description: string | null;
            ACTIVITY_TYPE: import("@prisma/client").$Enums.ACTIVITY_TYPE;
            reps: number | null;
            sets: number | null;
            duration: number | null;
        };
        Train: {
            Plan: {
                id: string;
                trainerId: string;
                title: string;
                description: string | null;
                from: Date;
                to: Date;
                traineeId: string;
            };
        } & {
            id: string;
            planId: string;
            from: Date;
            to: Date;
            weekDay: import("@prisma/client").$Enums.WEEK_DAYS;
        };
    } & {
        id: string;
        weight: number | null;
        description: string | null;
        reps: number | null;
        sets: number | null;
        duration: number | null;
        activityId: string;
        trainId: string;
    }>;
    remove(id: string, profile: {
        id: string;
        role: number;
    }): Promise<{
        id: string;
        weight: number | null;
        description: string | null;
        reps: number | null;
        sets: number | null;
        duration: number | null;
        activityId: string;
        trainId: string;
    }>;
}
