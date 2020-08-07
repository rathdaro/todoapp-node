import { Container } from 'typedi';
import MailService from '../services/mailer';

export default class EmailSequenceJob {
    public async ExceptionHandler(job, done): Promise<void> {
        const Logger = Container.get('logger')
        try {
            Logger.debug('Email Sequence Job triggered!');
            const { email, name }: { [key: string ]: string } = job.attrs.data;
            const mailerServiceInstance = Container.get(MailService);
            await mailerServiceInstance.SendWelcomeEmail(email)
            done();
        } catch (e) {
            Logger.error('Error with Email Sequence Job: %o', e);
            done(e);
        }
    }
}