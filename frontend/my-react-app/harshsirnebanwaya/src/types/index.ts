export interface User {
    id: string;
    name: string;
    email: string;
    profilePicture: string;
}

export interface AuthResponse {
    user: User;
    accessToken: string;
    expiresIn: number;
}