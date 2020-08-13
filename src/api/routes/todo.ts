import { Request, Response, NextFunction, Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import { Container } from 'typedi';
import middlewares from '../middlewares';
import TodoService from '../../services/todo';
import { ITodoInputDTO } from '../../interfaces/ITodo';

const route = Router();

export default (app: Router) => {
    app.use('/todos', route);

    route.get('/', middlewares.isAuth, middlewares.attachCurrentUser, 
    async(req: Request, res: Response, next: NextFunction) => {
        const Logger: any = Container.get('logger');
        Logger.debug('Calling Get All Todos endpoint');
        try {
            const todoServiceInstance = Container.get(TodoService);
            const todos = await todoServiceInstance.GetAllTodos(req.currentUser._id);
            return res.json({ todos }).status(200);
        } catch (e) {
            Logger.error(e);
            throw e;
        }
    });

    route.post('/', middlewares.isAuth, middlewares.attachCurrentUser, celebrate({
        body: Joi.object({
            title: Joi.string().required(),
            description: Joi.string().required(),
            status: Joi.bool().required()
        })
    }), async (req: Request, res: Response, next: NextFunction) => {
        const Logger: any = Container.get('logger');
        Logger.debug('Calling Create todo end-point with body: %o', {...req.body, ...req.currentUser._id});
        try {
            const todoServiceInstance = Container.get(TodoService);
            await todoServiceInstance.CreateTodo( {...req.body, ...req.currentUser._id} as ITodoInputDTO)
            return res.json(200).end();
        } catch (e) {
            Logger.error(e);
            throw e;
        }
    });

    route.put('/:id', middlewares.isAuth, middlewares.attachCurrentUser, async (req) => {
        
    });

    route.delete('/:id', middlewares.isAuth, middlewares.attachCurrentUser, async (req) => {

    });



}