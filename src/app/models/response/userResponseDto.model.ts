import { ListResponseDto } from "./listResponseDto.model";
import { RoomResponseDto } from "./roomResponseDto.model";

export interface UserResponseDto {
    id: number,
    username: string,
    role: string,
    friends: Array<UserResponseDto>,
    createdRooms: Array<RoomResponseDto>,
    lists: Array<ListResponseDto>
}