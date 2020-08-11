import { Container } from 'typedi';
import LoggerInstance from './logger';
import agendaFactory from './agenda';
import config from '../config';
import nodemailer from 'nodemailer';

export default async ({ mongoConnection, models}: { mongoConnection: any; models: { name: string; model: any }[] }) => {
    try {
        models.forEach(m => {
            Container.set(m.name, m.model);
        });

        const agendaInstance = agendaFactory({ mongoConnection });

        Container.set('agendaInstance', agendaInstance);
        Container.set('logger', LoggerInstance);
        // Container.set('emailClient', nodemailer.createTransport({
        //     host: config.emails.host,
        //     port: config.emails.port,
        //     auth: {
        //         user: config.emails.user,
        //         pass: config.emails.pass,
        //     }
        // }));
        
        LoggerInstance.info(`Agenda injected into container`);
        return { agenda: agendaInstance};
    } catch (e) {
        LoggerInstance.error('Error on dependency injector loader: %o', e);
        throw e;
    }
}