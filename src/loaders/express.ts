import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from '../api';
import config from '../config';
import { errors } from 'celebrate';

export default async ({ app }: { app: express.Application }) => {
    
    app.get('/status', (req: any, res: any) => {
        res.status(200).end();
    });
    app.head('/status', (req: any, res: any) => {
        res.status(200).end();
    });

    app.enable('trust proxy');

    app.use(cors());
    app.use(require('method-override')());

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(config.api.prefix, routes());
    app.use(errors());

    app.use((req: any, res: any, next: any) => {
        const err = new Error('Not Found');
        err['status'] = 404;
        next(err);
    });

    app.use((err: any, req: any, res: any, next: any) => {
        if (err.name == 'UnauthorizedError') {
            return res
            .status(err.status)
            .send({ message: err.message })
            .end();
        }
        return next(err);
    });
    
    app.use((err: any, req: any, res: any, next: any) => {
        res.status(err.status || 500);
        res.json({
            errors: {
                message: err.message,
            },
        });
    });
}