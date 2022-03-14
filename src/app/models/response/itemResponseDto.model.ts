import { CategoryResponseDto } from "./categoryResponseDto.model";
import { RoomResponseDto } from "./roomResponseDto.model";

export interface ItemResponseDto {
    id: number,
    name: string,
    quantity: number,
    value:number,
    categoryDto: CategoryResponseDto,
    comments: string,
    room: RoomResponseDto
}