import { UserResponseDto } from "./userResponseDto.model";

export interface RoomResponseDto{
    id:number,
    name:string,
    sharedWith:Array<UserResponseDto>,
    author:UserResponseDto
}