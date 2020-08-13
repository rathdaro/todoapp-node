export interface ITodo {
    _id: string;
    title: string;
    description: string;
    status: boolean;
    user: string;
}

export interface ITodoInputDTO {
    title: string;
    description: string;
    status: boolean;
    user: string;
}