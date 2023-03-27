export interface IUser {
    ownerName: string;
    businessName: string;
    email: string;
    password: string;
    apiKey?: string;
    profileImage?: File;
}

export interface AccountData {
    userId: string;
    businessName: string;
    profileImagePath?: string;
    ownerName: string;
    email: string;
    apiKey: string;
    token: string;
    expiration: number;
}
