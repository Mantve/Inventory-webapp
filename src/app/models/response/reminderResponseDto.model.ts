import { RepeatFrequency } from "../enums/repeatFrequency.model"
import { ItemResponseDto } from "./itemResponseDto.model"

export interface ReminderResponseDto {
    id: number,
    item: ItemResponseDto,
    reason: string,
    reminderTime: Date,
    repeatFrequency: RepeatFrequency
}