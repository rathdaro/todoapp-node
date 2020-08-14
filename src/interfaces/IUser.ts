export interface IUser {
    _id: string;
    name: string;
    email: string;
    password: string;
    todos: [];
}

export interface IUserInputDTO {
    name: string;
    email: string;
    password: string;
}