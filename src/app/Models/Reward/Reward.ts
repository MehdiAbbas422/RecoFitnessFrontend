export interface RewardGet {
    id: number;
    rewardItem: string;
    description: string;
    months: number;
    
}   

export interface RewardCreate {
    rewardItem: string;
    description: string;
    months: number;
}

export interface RewardEdit {
    id: number;
    rewardItem: string;
    description: string;
    months: number;
}

