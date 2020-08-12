import { Service, Inject } from 'typedi';
import { ITodo } from '../interfaces/ITodo';

@Service()
export default class TodoService {
    constructor(
        @Inject('todoModel') private todoModel: Models.TodoModel,
        @Inject('logger') private logger: any
    ){ }

    public async CreateTodo(user_id: string): Promise<{ todo: ITodo }> {
        
    }

}