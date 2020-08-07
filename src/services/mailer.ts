import { Service, Inject } from 'typedi';
import { IUser } from '../interfaces/IUser';

@Service()
export default class MailService {
    constructor(
        @Inject('emailClient') private emailClient
    ){ }

    public async SendWelcomeEmail(email) {
        const data = {
            from: 'Excited User <me@samples.mailgun.org>',
            to: email,
            subject: 'Hello',
            text: 'Testing some Mailgun awesomeness!'
        };
        this.emailClient.messages().send(data);
        return { delivered: 1, status: 'ok' };
    }

    public StartEmailSequence(sequence: string, user: Partial<IUser>) {
        if (!user.email) {
            throw new Error('No email provided');
        }
        return { delivered: 1, status: 'ok' };
    }
}