import { UserType } from "./user.types";

export type PostType = {
    _id: string;
    author: UserType;
    message: string;
    likes: Array<string>;
    replies: Array<string>;
}

export type createPostType = {
    message: string,
    userId: string,
    postId?: string,
    idToken: string
}