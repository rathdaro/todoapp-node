import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import AuthService from '../../services/auth';
import { IUserInputDTO } from '../../interfaces/IUser';
import middlewares from '../middlewares';
import { celebrate, Joi } from 'celebrate';

const route = Router();

export default (app: Router) => {
    app.use('/auth', route);

    route.post(
        '/signup',
        celebrate({
            body: Joi.object({
                name: Joi.string().required(),
                email: Joi.string().required(),
                password: Joi.string().required(),
            }),
        }),
        async (req: Request, res: Response, next: NextFunction) => {
            const Logger: any = Container.get('logger');
            Logger.debug('Calling Sign-Up endpoint with body: %o', req.body)
            try {
                const authServiceInstance = Container.get(AuthService);
                const { user, token } = await authServiceInstance.SignUp(req.body as IUserInputDTO);
                return res.status(201).json({ user, token });
            } catch (e) {
                Logger.error('AuthRouteSignUpError : %o', e);
                return next(e);
            }
        }
    );

    route.post(
        '/signin', 
        celebrate({
            body: Joi.object({
                email: Joi.string().required(),
                password: Joi.string().required(),
            }),
        }),
        async (req: Request, res: Response, next: NextFunction) => {
            const Logger: any = Container.get('logger');
            Logger.debug('Calling Sign-Up endpoint with body: %o', req.body );
            try {
                const authServiceInstance = Container.get(AuthService);
                const { user, token } = await authServiceInstance.SignIn(req.body.email, req.body.password);
                return res.json({ user, token }).status(200);
            } catch (e) {
                Logger.error('AuthRouteSignInError : %o', e);
                next(e);
            }
        }
    );

    route.post('/logout', middlewares.isAuth, (req: Request, res: Response, next: NextFunction ) => {
        const Logger: any = Container.get('logger');
        Logger.debug('Calling Sign-Out endpoint with body: %o', req.body );
        try {
            // TODO sign out
            return res.status(200).end();
        } catch (e) {
            Logger.error('AuthRouteLogoutError : %o', e);
            next(e);
        }
    });
};