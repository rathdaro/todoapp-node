import { Container } from 'typedi';
import MailerService from '../services/mailer';
import { Logger } from 'winston';

export default class EmailSequenceJob {
    public static async handler(job: any, done: any): Promise<void> {
        const logger: Logger = Container.get('logger')
        try {
            logger.debug('Email Sequence Job triggered!');
            const { email, name }: { [key: string ]: string } = job.attrs.data;
            const mailerServiceInstance = Container.get(MailerService);
            await mailerServiceInstance.SendWelcomeEmail(email)
            done();
        } catch (e) {
            logger.error('Error with Email Sequence Job: %o', e);
            done(e);
        }
    }
}