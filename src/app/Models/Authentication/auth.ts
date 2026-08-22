export interface RegisterModel { 
    CustomerName: string;
    Email: string;
    Password: string;
    PhoneNumber:string;
    PlanType:Number;
}

export interface LoginModel {
    
    Email: string;
    Password: string;
}