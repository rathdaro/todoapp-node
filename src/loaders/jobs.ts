import config from '../config';
import EmailSequenceJob from '../jobs/emailSequence';
import Agenda from 'agenda';

export default async ({ agenda }: { agenda: Agenda }) => {
  agenda.define(
    'send-email',
    { priority: 'high', concurrency: config.agenda.concurrency },
    EmailSequenceJob.handler,
  );

  agenda.start();
};