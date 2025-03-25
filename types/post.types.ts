import { UserType } from "./user.types";

export type PostType = {
    id: number;
    author: UserType;
    message: string;
    likes: number;
    repliesCount: number;
}