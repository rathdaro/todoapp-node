import { Router, Request, Response, NextFunction } from 'express';
import middlewares from '../middlewares';

const route = Router();

export default (app: Router) => {
    app.use('/users', route);

    route.get('/me', middlewares.isAuth, middlewares.attachCurrentUser, (req: Request, res: Response) => {
        return res.json({ user: req.currentUser }).status(200);
    });

    route.put('/me', middlewares.isAuth, middlewares.attachCurrentUser, (req: Request, res: Response, next: NextFunction) => {
        // TODO update user info from put
        return res.json({ user: req.currentUser }).status(200);
    });
};