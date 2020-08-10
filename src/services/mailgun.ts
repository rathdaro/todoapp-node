import { Service, Inject } from 'typedi';
import { IUser } from '../interfaces/IUser';

@Service()
export default class MailgunService {
    constructor(
        @Inject('mailgunEmailClient') private mailgunEmailClient:
    ){ }

    public async SendWelcomeEmail(email: string) {
        const data = {
            from: 'Excited User <me@samples.mailgun.org>',
            to: email,
            subject: 'Hello',
            text: 'Testing some Mailgun awesomeness!'
        };
        this.mailgunEmailClient.messages().send(data);
        return { delivered: 1, status: 'ok' };
    }

    public StartEmailSequence(sequence: string, user: Partial<IUser>) {
        if (!user.email) {
            throw new Error('No email provided');
        }
        return { delivered: 1, status: 'ok' };
    }
}