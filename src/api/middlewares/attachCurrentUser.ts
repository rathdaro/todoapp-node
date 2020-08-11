import { Container } from 'typedi';
import mongoose from 'mongoose';
import { IUser } from '../../interfaces/IUser';
import { Logger } from 'winston';

const attachCurrentUser = async (req: any, res: any, next: any) => {
    const logger: Logger = Container.get('logger');
    try {
        const UserModel = Container.get('userModel') as mongoose.Model<IUser & mongoose.Document>;
        const userRecord = await UserModel.findById(req.token._id);
        if (!userRecord) {
            return res.sendStatus(401);
        }
        const currentUser = userRecord.toObject();
        Reflect.deleteProperty(currentUser, 'password');
        req.currentUser = currentUser;
        return next();
    } catch (e) {
        logger.error('Error attaching user to req: %o', e);
        return next(e);
    }
};

export default attachCurrentUser;