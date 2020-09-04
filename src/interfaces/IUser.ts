export interface IUser {
    _id: string;
    name: string;
    email: string;
    password: string;
    todos?: Array<string>;
}

export interface IUserInputDTO {
    name: string;
    email: string;
    password: string;
}