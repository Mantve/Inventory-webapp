export interface ItemCreateDto {
    name: string,
    quantity: number,
    value:number,
    categoryId:number,
    parentItemId:number
    comments: string,
    roomId: number
}