import { PrismaService } from 'src/prisma/prisma.service';
export declare class ReportFunctionsService extends PrismaService {
    createReport(data: any): Promise<{
        id: string;
        Trainee: {
            email: string;
            name: string | null;
            id: string;
        };
        content: string | null;
        imc: number | null;
        bodyFat: number | null;
        weight: number | null;
        height: number | null;
        profileId: string;
        planId: string | null;
        createdAt: Date;
    }>;
    getAllReports(): Promise<{
        id: string;
        Trainee: {
            email: string;
            name: string | null;
            id: string;
            trainerId: string | null;
        };
        content: string | null;
        imc: number | null;
        bodyFat: number | null;
        weight: number | null;
        height: number | null;
        profileId: string;
        planId: string | null;
        createdAt: Date;
        BodyPart: {
            name: string;
            id: string;
            bodyFat: number | null;
        }[];
    }[]>;
    getReportById(id: string): Promise<{
        id: string;
        Trainee: {
            email: string;
            name: string | null;
            id: string;
            trainerId: string | null;
        };
        Trainer: {
            email: string;
            name: string | null;
            id: string;
        } | null;
        content: string | null;
        imc: number | null;
        bodyFat: number | null;
        weight: number | null;
        height: number | null;
        profileId: string;
        planId: string | null;
        createdAt: Date;
        createdBy: string | null;
        BodyPart: {
            name: string;
            id: string;
            bodyFat: number | null;
        }[];
        Plan: {
            id: string;
            title: string;
            description: string | null;
        } | null;
    } | null>;
    getReportsWithFilters(filters: {
        profileId?: string;
        from?: string;
        to?: string;
    }): Promise<{
        id: string;
        Trainee: {
            email: string;
            name: string | null;
            id: string;
            trainerId: string | null;
        };
        content: string | null;
        imc: number | null;
        bodyFat: number | null;
        weight: number | null;
        height: number | null;
        profileId: string;
        planId: string | null;
        createdAt: Date;
        BodyPart: {
            name: string;
            id: string;
            bodyFat: number | null;
        }[];
    }[]>;
    getReportsByTrainer(trainerId: string, filterProfileId?: string): Promise<{
        id: string;
        Trainee: {
            email: string;
            name: string | null;
            id: string;
        };
        content: string | null;
        imc: number | null;
        bodyFat: number | null;
        weight: number | null;
        height: number | null;
        profileId: string;
        planId: string | null;
        createdAt: Date;
        BodyPart: {
            name: string;
            id: string;
            bodyFat: number | null;
        }[];
    }[]>;
    getReportsByTrainee(traineeId: string): Promise<{
        id: string;
        content: string | null;
        imc: number | null;
        bodyFat: number | null;
        weight: number | null;
        height: number | null;
        profileId: string;
        planId: string | null;
        createdAt: Date;
        BodyPart: {
            name: string;
            id: string;
            bodyFat: number | null;
        }[];
        Plan: {
            id: string;
            title: string;
            description: string | null;
        } | null;
    }[]>;
    updateReport(id: string, data: any): Promise<{
        id: string;
        content: string | null;
        imc: number | null;
        bodyFat: number | null;
        weight: number | null;
        height: number | null;
        profileId: string;
        planId: string | null;
        createdAt: Date;
    }>;
    deleteReport(id: string): Promise<{
        id: string;
        content: string | null;
        imc: number | null;
        bodyFat: number | null;
        weight: number | null;
        height: number | null;
        profileId: string;
        planId: string | null;
        createdAt: Date;
        createdBy: string | null;
    }>;
    verifyTraineeOwnership(traineeId: string, trainerId: string): Promise<boolean>;
    existReportById(id: string): Promise<{
        id: string;
    } | null>;
}
