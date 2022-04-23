import { CategoryResponseDto } from "./categoryResponseDto.model";
import { ItemResponseDto } from "./itemResponseDto.model";
import { RoomResponseDto } from "./roomResponseDto.model";

export interface RecursiveItemResponseDto {
    id: number,
    name: string,
    quantity: number,
    category: CategoryResponseDto,
    comments: string,
    room: RoomResponseDto,
    items:Array<RecursiveItemResponseDto>,
    parentItem:ItemResponseDto
}