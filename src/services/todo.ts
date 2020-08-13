import { Service, Inject } from 'typedi';
import { ITodoInputDTO } from '../interfaces/ITodo';

@Service()
export default class TodoService {
    constructor(
        @Inject('todoModel') private todoModel: Models.TodoModel,
        @Inject('logger') private logger: any
    ){ }

    public async CreateTodo(todoInputDTO: ITodoInputDTO): Promise<void> {
        try {
            this.logger.silly('Creating a Todo list');
            const todoRecord = await this.todoModel.create({ ...todoInputDTO });
            if (!todoRecord) {
                throw new Error('Error creating a todo list');
            }
        } catch (e) {
            this.logger.error(e);
            throw e;
        }
    }

    public async GetAllTodos(user_id: string): Promise<any> {
        const todos = await this.todoModel.find().populate({ path: 'users', match: { _id: user_id }});
        this.logger.debug('Todos: %o', todos);
        return todos;
    }

    public async GetTodo(user_id: string): Promise<void> {
        // TODO get one todo
    }

    public async UpdateTodo(id: string): Promise<void> {
        // TODO update todo
    }

    public async DeleteTodo(id: string): Promise<void> {
        // TODO delete todo
    }

}