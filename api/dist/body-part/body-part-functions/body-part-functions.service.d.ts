import { PrismaService } from 'src/prisma/prisma.service';
export declare class BodyPartFunctionsService extends PrismaService {
    createBodyPart(data: any): Promise<{
        name: string;
        id: string;
        bodyFat: number | null;
        reportId: string;
    }>;
    getAllBodyParts(): Promise<{
        name: string;
        id: string;
        bodyFat: number;
        reportId: string;
        Report: {
            id: string;
            Trainee: {
                email: string;
                name: string;
                id: string;
            };
        };
    }[]>;
    getBodyPartById(id: string): Promise<{
        name: string;
        id: string;
        bodyFat: number;
        reportId: string;
        Report: {
            id: string;
            Trainee: {
                email: string;
                name: string;
                id: string;
            };
        };
    }>;
    getBodyPartsByReport(reportId: string): Promise<{
        name: string;
        id: string;
        bodyFat: number;
        reportId: string;
        Report: {
            id: string;
            Trainee: {
                email: string;
                name: string;
                id: string;
            };
        };
    }[]>;
    getBodyPartsByTrainer(trainerId: string): Promise<{
        name: string;
        id: string;
        bodyFat: number;
        reportId: string;
        Report: {
            id: string;
            Trainee: {
                email: string;
                name: string;
                id: string;
            };
        };
    }[]>;
    getBodyPartsByTrainee(traineeId: string): Promise<{
        name: string;
        id: string;
        bodyFat: number;
        reportId: string;
        Report: {
            id: string;
        };
    }[]>;
    updateBodyPart(id: string, data: any): Promise<{
        name: string;
        id: string;
        bodyFat: number;
        reportId: string;
    }>;
    deleteBodyPart(id: string): Promise<{
        name: string;
        id: string;
        bodyFat: number | null;
        reportId: string;
    }>;
    verifyReportOwnership(reportId: string, trainerId: string): Promise<boolean>;
    verifyBodyPartAccess(bodyPartId: string, userId: string, userType: 'trainer' | 'trainee'): Promise<boolean>;
    existBodyPartById(id: string): Promise<{
        id: string;
    }>;
}
