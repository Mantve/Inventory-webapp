import { MessageType } from "../enums/messageType.model";
import { UserResponseDto } from "./userResponseDto.model";

export interface MessageResponseDto {
    id: number,
    recipient: UserResponseDto,
    author: UserResponseDto,
    contents:string,
    messagetype: MessageType
}