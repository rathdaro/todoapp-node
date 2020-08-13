import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import jobsLoader from './jobs';
import Logger from './logger';

export default async ({ expressApp }) => {
    const mongoConnection = await mongooseLoader();
    Logger.info('DB loaded and connected!');

    const userModel = {
        name: 'userModel',
        model: require('../models/user').default,
    };

    const todoModel = {
        name: 'todoModel',
        model: require('../models/todo').default,
    }

    const { agenda } = await dependencyInjectorLoader({
        mongoConnection,
        models: [
            userModel,
            todoModel,
        ]
    });
    Logger.info('Dependency Injector loaded');

    // await jobsLoader({ agenda });
    // Logger.info('Jobs loaded');

    await expressLoader({ app: expressApp });
    Logger.info('Express loaded');
};