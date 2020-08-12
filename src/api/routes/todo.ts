import { Request, Response, NextFunction, Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import { Container } from 'typedi';
import middlewares from '../middlewares';
import { ITodo } from '../../interfaces/ITodo';

const route = Router();

export default (app: Router) => {
    app.use('/todo', route);

    route.post('/', middlewares.isAuth, middlewares.attachCurrentUser, async (req) => {

    });




}