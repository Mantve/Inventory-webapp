import { RepeatFrequency } from "../enums/repeatFrequency.model";

export interface ReminderUpdateDto {
    reason: string,
    reminderTime: Date,
    repeatFrequency: RepeatFrequency
}