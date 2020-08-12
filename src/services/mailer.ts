import { IUser } from '../interfaces/IUser';
import config from '../config';
import nodemailer from 'nodemailer';

export default class MailerService {
    constructor(
    ){ }

    public async SendWelcomeEmail(receiver_email: string, receiver_name: string) {

        let sender_email: string = 'admin@inbox.mailtrap.io';
        let email_subject: string = 'Welcome to Todoapp';
        let email_text: string = `
        Hello ${receiver_name},
        Welcome to Todoapp. 
        It's nothing here just ignore this.
        `;
        let email_html: string = `
        <h3>Hello, ${receiver_name},</h3>
        <h4>Welcome to Todoapp.</h4>
        <p>It's nothing here just ignore this.</p>
        `;

        const transport = {
            host: config.emails.host,
            port: config.emails.port,
            auth: {
                user: config.emails.user,
                pass: config.emails.pass,
            }
        }

        const mailOptions = {
            from: sender_email,
            to: receiver_email,
            subject: email_subject,
            text: email_text,
            html: email_html,
        };
        
        const transporter = nodemailer.createTransport(transport);

        transporter.sendMail(mailOptions, (err: any, info: any) => {
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