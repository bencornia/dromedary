export interface IUser {
    profileImage?: File;
    ownerName: string;
    businessName: string;
    email: string;
    password: string;
    apiKey?: string;
}

export interface AccountData {
    userId: string;
    businessName: string;
    profileImagePath: string;
    ownerName: string;
    email: string;
    apiKey: string;
    token: string;
    expiration: number;
}
