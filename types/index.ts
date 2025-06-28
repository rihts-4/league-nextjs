// Authentication interfaces
export interface LoginCredentials {
    email: string;
    password: string;
}

export interface User {
    id?: string;
    username: string;
    email?: string;
}

export interface AuthSession {
    access_token: string;
    refresh_token: string;
    expires_at?: number;
}

export interface LoginResponse {
    message?: string;
    success: boolean;
    user?: User;
    session?: AuthSession;
    error?: string;
    details?: string;
}