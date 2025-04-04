export type UserType = {
    firstName: string;
    lastName: string;
    username: string;
    profilePic: string;
    followers?: Array<UserType>
    following?: Array<UserType>
}