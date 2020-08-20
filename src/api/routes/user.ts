import { Router, Request, Response, NextFunction } from 'express';
import middlewares from '../middlewares';
import { Container } from 'typedi';
import UserService from '../../services/user';
import { celebrate, Joi } from 'celebrate';
import { IUserInputDTO } from '../../interfaces/IUser';

const route = Router();

export default (app: Router) => {
    app.use('/users', route);

    route.get('/me', middlewares.isAuth, middlewares.attachCurrentUser, (req: Request, res: Response) => {
        return res.json({ user: req.currentUser }).status(200);
    });

    route.put('/me', middlewares.isAuth, middlewares.attachCurrentUser, celebrate({
        body: Joi.object({
            name: Joi.string(),
            password: Joi.string()
        })
    }), async (req: Request, res: Response, next: NextFunction) => {
        const Logger: any = Container.get('logger');
        try {
            const userInstanceService = Container.get(UserService);
            const userRecord = await userInstanceService.UpdateUserInfo(req.currentUser._id, req.body as IUserInputDTO)
        } catch (e) {
            Logger.error(e);
            next(e);
        }
        return res.json({ user: req.currentUser }).status(200);
    });
};