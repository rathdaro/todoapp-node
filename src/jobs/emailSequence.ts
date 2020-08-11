import { Container } from 'typedi';
import MailerService from '../services/mailer';

export default class EmailSequenceJob {
    public static async handler(job: any, done: any): Promise<void> {
        const Logger: any = Container.get('logger')
        try {
            Logger.debug('Email Sequence Job triggered!');
            const { email, name }: { [key: string ]: string } = job.attrs.data;
            const mailerServiceInstance = Container.get(MailerService);
            await mailerServiceInstance.SendWelcomeEmail(email)
            done();
        } catch (e) {
            Logger.error('Error with Email Sequence Job: %o', e);
            done(e);
        }
    }
}