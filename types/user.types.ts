export type UserType = {
    firstName: string;
    lastName: string;
    username: string;
    profilePicUrl: string;
    followers?: Array<UserType>
    following?: Array<UserType>
}