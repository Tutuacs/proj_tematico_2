import { PrismaService } from 'src/prisma/prisma.service';
export declare class ReportFunctionsService extends PrismaService {
    createReport(data: any): Promise<{
        id: string;
        Trainee: {
            email: string;
            name: string;
            id: string;
        };
        content: string;
        imc: number;
        bodyFat: number;
        weight: number;
        height: number;
        profileId: string;
        planId: string;
        createdAt: Date;
    }>;
    getAllReports(): Promise<{
        id: string;
        Trainee: {
            email: string;
            name: string;
            id: string;
            trainerId: string;
        };
        content: string;
        imc: number;
        bodyFat: number;
        weight: number;
        height: number;
        profileId: string;
        planId: string;
        createdAt: Date;
        BodyPart: {
            name: string;
            id: string;
            bodyFat: number;
        }[];
    }[]>;
    getReportById(id: string): Promise<{
        id: string;
        Trainee: {
            email: string;
            name: string;
            id: string;
            trainerId: string;
        };
        Trainer: {
            email: string;
            name: string;
            id: string;
        };
        content: string;
        imc: number;
        bodyFat: number;
        weight: number;
        height: number;
        profileId: string;
        planId: string;
        createdAt: Date;
        createdBy: string;
        BodyPart: {
            name: string;
            id: string;
            bodyFat: number;
        }[];
        Plan: {
            id: string;
            title: string;
            description: string;
        };
    }>;
    getReportsWithFilters(filters: {
        profileId?: string;
        from?: string;
        to?: string;
    }): Promise<{
        id: string;
        Trainee: {
            email: string;
            name: string;
            id: string;
            trainerId: string;
        };
        content: string;
        imc: number;
        bodyFat: number;
        weight: number;
        height: number;
        profileId: string;
        planId: string;
        createdAt: Date;
        BodyPart: {
            name: string;
            id: string;
            bodyFat: number;
        }[];
    }[]>;
    getReportsByTrainer(trainerId: string, filterProfileId?: string): Promise<{
        id: string;
        Trainee: {
            email: string;
            name: string;
            id: string;
        };
        content: string;
        imc: number;
        bodyFat: number;
        weight: number;
        height: number;
        profileId: string;
        planId: string;
        createdAt: Date;
        BodyPart: {
            name: string;
            id: string;
            bodyFat: number;
        }[];
    }[]>;
    getReportsByTrainee(traineeId: string): Promise<{
        id: string;
        content: string;
        imc: number;
        bodyFat: number;
        weight: number;
        height: number;
        profileId: string;
        planId: string;
        createdAt: Date;
        BodyPart: {
            name: string;
            id: string;
            bodyFat: number;
        }[];
        Plan: {
            id: string;
            title: string;
            description: string;
        };
    }[]>;
    updateReport(id: string, data: any): Promise<{
        id: string;
        content: string;
        imc: number;
        bodyFat: number;
        weight: number;
        height: number;
        profileId: string;
        planId: string;
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
    }>;
}
