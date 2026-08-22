export interface User
{
    id: number;
    customerName: string;
    email: string;
    phoneNumber: string;
    planType: number;
    roles : string;
    paymentStatus:string;
    streakMouths:number;
    expiryDate: Date;
    amountPaid: number;
    createAt : Date;
    Password: string;
    gracePeriodEnd: number;
    subscriptionStatus: string;
}


export interface UserInfo
{
    Users:User[];
        Page:number;
    TotolUsers:number;
    PageSize:number;
}