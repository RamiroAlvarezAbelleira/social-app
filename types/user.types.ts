export type UserType = {
    _id?: string;
    firstName: string;
    lastName: string;
    username: string;
    profilePicUrl: string;
    followers?: Array<string>
    following?: Array<string>
}