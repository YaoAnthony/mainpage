
/**
 * Defines the structure for a user entity within the application.
 */
export interface User {
    _id: string;
    userId: string;
    
    username: string;
    isVerified: boolean;
    avatar: string;
    followers: number;
    rate: number;
    personalSignature: string;

    // Optional fields
    roles?: string[];
}

/**
 * Token payload for a user.
 */
export type AuthToken = {
    accessToken: string;
    refreshToken: string;
    expireTime: number;
};

/**
 * Error type for the authentication process.
 */
export type AuthError = {
    status: number;
    error: {
        message: string;
    };
};

/**
 * Defines the structure for a user credentials.
 */
export type Credentials = {
    email: string;
    password: string;
    username?: string;
}