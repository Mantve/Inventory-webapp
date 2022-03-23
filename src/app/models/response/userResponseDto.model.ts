import { ListResponseDto } from "./listResponseDto.model";
import { RoomResponseDto } from "./roomResponseDto.model";

export interface UserResponseDto {
    id: number,
    username: string,
    role: string,
    friends: Array<UserResponseDto>,
    rooms: Array<RoomResponseDto>,
    lists: Array<ListResponseDto>
}