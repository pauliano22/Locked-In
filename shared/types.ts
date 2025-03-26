// For both Express and React Native
export interface IUser {
    _id: string;
    name: string;
    email: string;
    interests: string[];
}

export interface IChat {
    _id: string;
    name: string;
    participants: string[]; // Array of user IDs
}