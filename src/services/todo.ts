import { Service, Inject } from 'typedi';
import { ITodoInputDTO } from '../interfaces/ITodo';

@Service()
export default class TodoService {
    constructor(
        @Inject('todoModel') private todoModel: Models.TodoModel,
        @Inject('userModel') private userModel: Models.UserModel,
        @Inject('logger') private logger: any
    ){ } 

    public async CreateTodo(user_id: string, todoInputDTO: ITodoInputDTO): Promise<any> {
        try {
            this.logger.silly('Creating a Todo list');
            const todoRecord = await this.todoModel.create({ ...todoInputDTO });
            if (!todoRecord) {
               throw new Error('Error Creating Todo');
            }
            const userRecord = await this.userModel.updateOne({ _id: user_id }, { $push: { todos: todoRecord._id }});
            if (!userRecord) {
                throw new Error('Error Pushing Todo to User')
            }
            if (todoRecord && userRecord) {
                return { message: 'success' };
            }
        } catch (e) {
            this.logger.error(e);
            throw e;
        }
    }

    public async GetAllTodos(user_id: string): Promise<any> {
        try {
            return await this.userModel.findOne({ _id: user_id}).populate('todos').select("todos -_id").exec();
        } catch (e) {
            this.logger.error(e);
            throw e;
        }
    }

    public async GetTodoById(user_id: string, todo_id: string): Promise<any> {
        try {
            const userRecord = await this.userModel.findOne({ _id: user_id });
            if (userRecord.todos.includes(todo_id)) {
                const todoRecord = await this.todoModel.findOne({ _id: todo_id});
                return todoRecord.toObject();
            }
        } catch (e) {
            this.logger.error(e);
            throw e;
        }
    }

    public async UpdateTodo(user_id: string, todo_id: string, todoInputDTO: ITodoInputDTO): Promise<any> {
        try {
            const userRecord = await this.userModel.findOne({ _id: user_id });
            if (userRecord.todos.includes(todo_id)) {
                const todoRecord = await this.todoModel.updateOne({ _id: todo_id}, {$set : { ...todoInputDTO }});
                if (!todoRecord) {
                    throw new Error('Error Updating Todo');
                } else {
                    return { message: 'success'};
                }
            }
        } catch (e) {
            this.logger.error(e);
            throw e;
        }
    }

    public async DeleteTodo(user_id: string, todo_id: string): Promise<any> {
        try {
            let userRecord = await this.userModel.findOne({ _id: user_id });
            if (userRecord.todos.includes(todo_id)) {
                const message = await this.todoModel.findOneAndDelete({ _id: todo_id, useFindAndModify: true }, (err, todo) => {
                    if (err) throw err;
                    this.userModel.updateOne({ "todos": todo_id}, { "$pull": { "todos": todo_id}}, (err, user) => {
                        if (err) throw err;
                        return { message: 'success'};
                    })
                });
            }
        } catch (e) {
            this.logger.error(e);
            throw e;
        }
    }

}