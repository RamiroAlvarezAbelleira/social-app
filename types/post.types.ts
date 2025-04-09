import { UserType } from "./user.types";

export type PostType = {
    id: number;
    author: UserType;
    message: string;
    likes: Array<string>;
    replies: Array<string>;
}