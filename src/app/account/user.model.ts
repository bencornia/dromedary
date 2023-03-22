export interface IUser {
    profileImage?: File;
    ownerName: string;
    businessName: string;
    email: string;
    password: string;
    apiKey?: string;
}

export interface AuthResponse {
    profileImagePath: string;
    ownerName: string;
    businessName: string;
    email: string;
}
