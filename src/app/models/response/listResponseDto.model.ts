import { ListItemResponseDto } from "./listItemResponseDto.model";
import { RoomResponseDto } from "./roomResponseDto.model";

export interface ListResponseDto {
    id: number,
    name: string,
    items: Array<ListItemResponseDto>,
    itemCount: number
}