declare enum ACTIVITY_TYPE {
    CARDIO = "CARDIO",
    STRENGTH = "STRENGTH",
    FLEXIBILITY = "FLEXIBILITY",
    BALANCE = "BALANCE"
}
export declare class CreateActivityDto {
    name: string;
    ACTIVITY_TYPE: ACTIVITY_TYPE;
    description?: string;
    weight?: number;
    reps?: number;
    sets?: number;
    duration?: number;
    planId: string;
}
export {};
