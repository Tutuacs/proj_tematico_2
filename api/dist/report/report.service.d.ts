import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { ReportFunctionsService } from './report-functions/report-functions.service';
export declare class ReportService {
    private readonly reportFunctions;
    constructor(reportFunctions: ReportFunctionsService);
    create(createReportDto: CreateReportDto, profile: {
        id: string;
        email: string;
        role: number;
        name: string;
    }): Promise<{
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
    findAll(profile: {
        id: string;
        email: string;
        role: number;
        name: string;
    }, filters?: {
        profileId?: string;
        from?: string;
        to?: string;
    }): Promise<{
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
    }[] | {
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
    findOne(id: string, profile: {
        id: string;
        email: string;
        role: number;
        name: string;
    }): Promise<{
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
    update(id: string, updateReportDto: UpdateReportDto, profile: {
        id: string;
        email: string;
        role: number;
        name: string;
    }): Promise<{
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
    remove(id: string, profile: {
        id: string;
        email: string;
        role: number;
        name: string;
    }): Promise<{
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
}
