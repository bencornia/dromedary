export interface IUser {
    businessName: string;
    ownerName: string;
    email: string;
    password: string;
    profileImagePath: string;
    createdDate: string;
    lastUpdatedDate: string;
}

export interface AccountData {
    userId: string;
    businessName: string;
    profileImagePath: string;
    ownerName: string;
    email: string;
    token: string;
    expiration: number;
}
