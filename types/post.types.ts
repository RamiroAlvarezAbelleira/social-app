import { User } from "./user.types";

export type PostType = {
    id: number;
    author: User;
    message: string;
    likes: number;
    repliesCount: number;
}