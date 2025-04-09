export type UserType = {
    _id?: string;
    firstName: string;
    lastName: string;
    username: string;
    profilePicUrl: string;
    followers?: Array<UserType>
    following?: Array<UserType>
}