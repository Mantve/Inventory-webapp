import { ItemResponseDto } from "./itemResponseDto.model";
import { ListResponseDto } from "./listResponseDto.model";

export interface ListItemResponseDto {
    id: number,
    item: ItemResponseDto,
    parentList: ListResponseDto,
    completed: boolean
}