import { Container } from 'typedi';
import { EventSubscriber, On} from 'event-dispatch';
import events from './events';
import { IUser } from '../interfaces/IUser';
import mongoose from 'mongoose';
// import MailerService from '../services/mailer';

@EventSubscriber()
export default class UserSubscriber {
    @On(events.user.signIn)
    public onUserSignIn({ _id }: Partial<IUser>) {
        const Logger: any = Container.get('logger');

        try {
            const UserModel = Container.get('UserModel') as mongoose.Model<IUser & mongoose.Document>;

            UserModel.update({ _id }, { $set: { lastLogin: new Date() }});
        } catch (e) {
            Logger.error(`Error on event ${events.user.signIn}: %o`, e);
            throw e;
        }
    }

    @On(events.user.signUp)
    public onUserSignUp({ name, email, _id }: Partial<IUser>) {
        const Logger: any = Container.get('logger');
        
        // TODO mail sequence
        // MailerService.startSequence('user.welcome', { email, name });

        try {
            const UserModel = Container.get('UserModel') as mongoose.Model<IUser & mongoose.Document>;
        } catch (e) {
            Logger.error(`Error on event ${events.user.signUp}: %o`, e);
            throw e;
        }
    }
}
