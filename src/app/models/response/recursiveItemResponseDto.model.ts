import { CategoryResponseDto } from "./categoryResponseDto.model";
import { RoomResponseDto } from "./roomResponseDto.model";

export interface RecursiveItemResponseDto {
    id: number,
    name: string,
    quantity: number,
    categoryDto: CategoryResponseDto,
    comments: string,
    room: RoomResponseDto,
    items:Array<RecursiveItemResponseDto>
}