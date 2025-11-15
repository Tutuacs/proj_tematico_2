import { ReportService } from './report.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
export declare class ReportController {
    private readonly reportService;
    constructor(reportService: ReportService);
    create(createReportDto: CreateReportDto, profile: {
        id: string;
        email: string;
        role: number;
        name: string;
    }): Promise<{
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
    findAll(profile: {
        id: string;
        email: string;
        role: number;
        name: string;
    }, profileId?: string, from?: string, to?: string): Promise<{
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
    }[] | {
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
    findOne(id: string, profile: {
        id: string;
        email: string;
        role: number;
        name: string;
    }): Promise<{
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
    }>;
    update(id: string, updateReportDto: UpdateReportDto, profile: {
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
