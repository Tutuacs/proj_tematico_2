import { BodyPartService } from './body-part.service';
import { CreateBodyPartDto } from './dto/create-body-part.dto';
import { UpdateBodyPartDto } from './dto/update-body-part.dto';
export declare class BodyPartController {
    private readonly bodyPartService;
    constructor(bodyPartService: BodyPartService);
    create(createBodyPartDto: CreateBodyPartDto, profile: {
        id: string;
        email: string;
        role: number;
        name: string;
    }): Promise<{
        name: string;
        id: string;
        bodyFat: number | null;
        reportId: string;
    }>;
    findAll(profile: {
        id: string;
        email: string;
        role: number;
        name: string;
    }, reportId?: string): Promise<{
        name: string;
        id: string;
        bodyFat: number;
        reportId: string;
        Report: {
            id: string;
        };
    }[]>;
    findOne(id: string, profile: {
        id: string;
        email: string;
        role: number;
        name: string;
    }): Promise<{
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
    update(id: string, updateBodyPartDto: UpdateBodyPartDto, profile: {
        id: string;
        email: string;
        role: number;
        name: string;
    }): Promise<{
        name: string;
        id: string;
        bodyFat: number;
        reportId: string;
    }>;
    remove(id: string, profile: {
        id: string;
        email: string;
        role: number;
        name: string;
    }): Promise<{
        name: string;
        id: string;
        bodyFat: number | null;
        reportId: string;
    }>;
}
