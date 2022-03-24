import { RepeatFrequency } from "../enums/repeatFrequency.model";

export interface ReminderCreateDto {
    itemId: number,
    reason: string,
    reminderTime: Date,
    repeatFrequency: RepeatFrequency
}