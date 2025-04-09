import { UserType } from "./user.types";

export type PostType = {
    id: number;
    author: UserType;
    message: string;
    likes: Array<string>;
    replies: Array<string>;
}

export type createPostType = {
    message: string,
    userId: string
}