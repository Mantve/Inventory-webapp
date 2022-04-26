import { CategoryResponseDto } from "./categoryResponseDto.model";
import { RoomResponseDto } from "./roomResponseDto.model";

export interface ItemResponseDto {
    id: number,
    name: string,
    quantity: number,
    value:number,
    category: CategoryResponseDto,
    comments: string,
    room: RoomResponseDto,
    parentItem: ItemResponseDto,
    sold: boolean
}