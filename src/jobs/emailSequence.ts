import { Container } from 'typedi';
import MailgunService from '../services/mailgun';
import NodemailerService from '../services/nodemailer';
import { Logger } from 'winston';

export default class EmailSequenceJob {
    public async ExceptionHandler(job, done): Promise<void> {
        const logger: Logger = Container.get('logger')
        try {
            logger.debug('Email Sequence Job triggered!');
            const { email, name }: { [key: string ]: string } = job.attrs.data;
            const mailgunServiceInstance = Container.get(MailgunService);
            await mailgunServiceInstance.SendWelcomeEmail(email)
            done();
        } catch (e) {
            logger.error('Error with Email Sequence Job: %o', e);
            done(e);
        }
    }
}