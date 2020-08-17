import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const env = dotenv.config()

if(env.error) {
    throw new Error('Could not find .env file!')
}

export default {
    port: process.env.PORT || 3000,
    databaseURL: process.env.MONGO_DB_URI,
    jwtSecret: process.env.JWT_SECRET,
    logs: {
        level: process.env.LOG_LEVEL || 'silly',
    },
    agenda: {
        dbCollection: process.env.AGENDA_DB_COLLECTION,
        pooltime: process.env.AGENDA_POOL_TIME,
        concurrency: parseInt(process.env.AGENDA_CONCURRENCY, 10) || 20,
    },
    api: {
        prefix: '/api/v1'
    },
    agendash: {
        user: 'agendash',
        password: '123456',
    },
    swagger: {
        user: 'swagger',
        password: '123456'
    },
    emails: {
        host: process.env.NODEMAILER_HOST,
        port: process.env.NODEMAILER_PORT,
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
    }
}
