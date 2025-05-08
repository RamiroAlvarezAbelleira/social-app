import { UserType } from "./user.types";

export type PostType = {
    _id: string;
    author: UserType;
    message: string;
    likes: Array<string>;
    replies: Array<string>;
    replyTo?: string;
    isParent: boolean
}

export type createPostType = {
    message: string,
    userId: string,
    postId?: string,
    idToken: string
}

export type likePostType = {
    userId: string,
    postId?: string,
    idToken: string
}