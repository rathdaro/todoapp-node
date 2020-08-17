import { Request, Response, NextFunction, Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { Container } from 'typedi';
import middlewares from '../middlewares';
import TodoService from '../../services/todo';
import { ITodoInputDTO } from '../../interfaces/ITodo';

const route = Router();

export default (app: Router) => {
    app.use('/todos', route);

    route.get('/:id?', middlewares.isAuth, middlewares.attachCurrentUser, celebrate({
        [Segments.PARAMS]: {
            id: Joi.string()
        }
    }),
    async(req: Request, res: Response, next: NextFunction) => {
        const Logger: any = Container.get('logger');
        try {
            const todoServiceInstance = Container.get(TodoService);
            if (req.params.id) {
                const todos = await todoServiceInstance.GetTodoById(req.currentUser._id, req.params.id);
                return res.json({ todos }).status(200);
            } else {
                const todos = await todoServiceInstance.GetAllTodos(req.currentUser._id);
                return res.json(todos).status(200);
            }
        } catch (e) {
            Logger.error(e);
            next(e);
        }
    });

    route.post('/create', middlewares.isAuth, middlewares.attachCurrentUser, celebrate({
        body: Joi.object({
            title: Joi.string().required(),
            description: Joi.string().required(),
            status: Joi.bool()
        })
    }), async (req: Request, res: Response, next: NextFunction) => {
        const Logger: any = Container.get('logger');
        Logger.debug('Calling Create todo end-point with body: %o', req.body);
        try {
            const todoServiceInstance = Container.get(TodoService);
            const message = await todoServiceInstance.CreateTodo(req.body as ITodoInputDTO, req.currentUser._id);
            return res.json(message).status(200).end();
        } catch (e) {
            Logger.error(e);
            next(e);
        }
    });

    route.put('/update', middlewares.isAuth, middlewares.attachCurrentUser, celebrate({
        body: Joi.object({
            title: Joi.string().required(),
            description: Joi.string().required(),
            status: Joi.bool().required()
        })
    }), async (req: Request, res: Response, next: NextFunction) => {
        const Logger: any = Container.get('logger');
        Logger.debug('Calling Create todo end-point with body: %o', req.body);
        try {
            const todoServiceInstance = Container.get(TodoService);
            const message = await todoServiceInstance.UpdateTodo(req.body as ITodoInputDTO, req.currentUser._id);
            return res.json(message).status(200).end();
        } catch (e) {
            Logger.error(e);
            next(e);
        }
    });

    route.delete('/delete/:id', middlewares.isAuth, middlewares.attachCurrentUser, celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().required()
        }
    }),
    async (req: Request, res: Response, next: NextFunction) => {
        const Logger: any = Container.get('logger');
        Logger.debug('Calling Delete todo end-point with id: %o', req.params._id);
        try {
            const todoServiceInstance = Container.get(TodoService);
            const message = await todoServiceInstance.DeleteTodo(req.currentUser._id, req.params.id);
            return res.json(message).status(200).end();
        } catch (e) {

        }
    });
}