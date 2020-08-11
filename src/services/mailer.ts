import { Service, Inject } from 'typedi';
import { IUser } from '../interfaces/IUser';

@Service()
export default class MailerService {
    constructor(
        @Inject('emailClient') private emailClient: any
    ){ }

    public async SendWelcomeEmail(receiver_email: string) {

        let sender_email: string = 'sender@gmail.com';
        let email_subject: string = 'Welcome to Todoapp';
        let email_text: string = 'Hello Friend, OMG WOW...';
        let email_html: string = '';

        const mailOptions = {
            from: sender_email,
            to: receiver_email,
            subject: email_subject,
            text: email_text,
            html: email_html,
        };

        this.emailClient.sendMail(mailOptions, (err: any, info: any) => {
            if (err) {
                throw new Error(`Error while sending email : ${err}`);
            }
            return { delivered: 1, status: 'ok', info: info};
        });
    }

    public StartEmailSequence(sequence: string, user: Partial<IUser>) {
        if (!user.email) {
            throw new Error('No email provided');
        }
        // TODO implement email sequence job
        return { delivered: 1, status: 'ok' };
    }
}