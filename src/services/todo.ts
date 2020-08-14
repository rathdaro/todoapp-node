import { Service, Inject } from 'typedi';
import { ITodoInputDTO } from '../interfaces/ITodo';

@Service()
export default class TodoService {
    constructor(
        @Inject('todoModel') private todoModel: Models.TodoModel,
        @Inject('userModel') private userModel: Models.UserModel,
        @Inject('logger') private logger: any
    ){ } 

    public async CreateTodo(todoInputDTO: ITodoInputDTO, user_id: string): Promise<void> {
        try {
            this.logger.silly('Creating a Todo list');
            const todoRecord = await this.todoModel.create({ ...todoInputDTO });
            if (!todoRecord) {
               throw new Error('Error Creating Todo');
            }
            const userRecord = await this.userModel.update({ _id: user_id }, { $push: { todos: todoRecord._id }});
            if (!userRecord) {
                throw new Error('Error Pushing Todo to User')
            }
        } catch (e) {
            this.logger.error(e);
            throw e;
        }
    }

    public async GetAllTodos(user_id: string): Promise<any> {
        try {
            const todos = await this.userModel.findOne({ _id: user_id}).populate('todos').exec();
            return todos.todos;
        } catch (e) {
            this.logger.error(e);
            throw e;
        }
    }

    public async GetTodoById(todo_id: string): Promise<any> {
        try {
            const todos = await this.todoModel.findOne({ _id: todo_id});
            return todos;
        } catch (e) {
            this.logger.error(e);
            throw e;
        }
    }

    public async UpdateTodo(todo_id: string, user_id: string): Promise<any> {
        // TODO update todo
    }

    public async DeleteTodo(todo_id: string, user_id: string): Promise<any> {
        // TODO delete todo
    }

}