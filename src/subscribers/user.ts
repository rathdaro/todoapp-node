import { Container } from 'typedi';
import { EventSubscriber, On} from 'event-dispatch';
import events from './events';
import { IUser } from '../interfaces/IUser';
import mongoose from 'mongoose';
import { Logger } from 'winston';
import MailerService from '../services/mailer';

@EventSubscriber()
export default class UserSubscriber {
    @On(events.user.signIn)
    public onUserSignIn({ _id }: Partial<IUser>) {
        const logger: Logger = Container.get('logger');

        try {
            const UserModel = Container.get('UserModel') as mongoose.Model<IUser & mongoose.Document>;

            UserModel.update({ _id }, { $set: { lastLogin: new Date() }});
        } catch (e) {
            logger.error(`Error on event ${events.user.signIn}: %o`, e);
            throw e;
        }
    }

    @On(events.user.signUp)
    public onUserSignUp({ name, email, _id }: Partial<IUser>) {
        const logger: Logger = Container.get('logger');
        
        
        MailerService.startSequence('user.welcome', { email, name });

        try {
            const UserModel = Container.get('UserModel') as mongoose.Model<IUser & mongoose.Document>;
        } catch (e) {
            logger.error(`Error on event ${events.user.signUp}: %o`, e);
            throw e;
        }
    }
}
