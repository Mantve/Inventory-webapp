import { MessageType } from "../enums/messageType.model";

export interface MessageCreateDto{
    recipientName:string,
    contents:string,
    messageType:MessageType
}