import { PlanService } from './plan.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
export declare class PlanController {
    private readonly planService;
    constructor(planService: PlanService);
    create(createPlanDto: CreatePlanDto, profile: {
        id: string;
        email: string;
        role: number;
        name: string;
    }): Promise<{
        id: string;
        trainerId: string;
        title: string;
        description: string | null;
        from: Date;
        to: Date;
        traineeId: string;
    }>;
    findAll(profile: {
        id: string;
        email: string;
        role: number;
        name: string;
    }, traineeId?: string, trainerId?: string, active?: string): Promise<{
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
    }[] | {
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
    }[] | {
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
    findOne(id: string, profile: {
        id: string;
        email: string;
        role: number;
        name: string;
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
    }>;
    update(id: string, updatePlanDto: UpdatePlanDto, profile: {
        id: string;
        email: string;
        role: number;
        name: string;
    }): Promise<{
        id: string;
        trainerId: string;
        title: string;
        description: string | null;
        from: Date;
        to: Date;
        traineeId: string;
    }>;
    remove(id: string, profile: {
        id: string;
        email: string;
        role: number;
        name: string;
    }): Promise<{
        id: string;
        trainerId: string;
        title: string;
        description: string | null;
        from: Date;
        to: Date;
        traineeId: string;
    }>;
    createActivities(id: string, activities: any[], profile: {
        id: string;
        email: string;
        role: number;
        name: string;
    }): Promise<import("@prisma/client").Prisma.BatchPayload>;
    deleteActivity(planId: string, activityId: string, profile: {
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
