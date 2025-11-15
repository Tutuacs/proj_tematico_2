declare enum WEEK_DAYS {
    SUNDAY = "SUNDAY",
    MONDAY = "MONDAY",
    TUESDAY = "TUESDAY",
    WEDNESDAY = "WEDNESDAY",
    THURSDAY = "THURSDAY",
    FRIDAY = "FRIDAY",
    SATURDAY = "SATURDAY"
}
export declare class CreateTrainDto {
    weekDay: WEEK_DAYS;
    from: string;
    to: string;
    planId: string;
}
export {};
