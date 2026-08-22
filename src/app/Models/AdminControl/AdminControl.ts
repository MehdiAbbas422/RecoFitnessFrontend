export interface AdminDeactivate {
    id: number;
    reason: string;
}

export interface AdminDeactivatedUser {
id: number;
  userId: number;
  userName: string;
  email: string;
  deactivationReason: string; // <--- Ye property yahan likhna zaroori hai
  deactivationDate: Date;
  remainingDays: number;
}
