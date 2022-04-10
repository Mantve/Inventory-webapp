export interface SubscriptionCreateDto{
    username:string,
    endpoint:string,
    expirationdate:Date,
    p256dh:string,
    auth:string

}