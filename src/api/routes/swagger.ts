import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import basicAuth from 'express-basic-auth';
import config from '../../config';

const swaggerDocument = YAML.load('./swagger.yaml');

export default (app: Router) => {
    app.use('/docs', 
    basicAuth({
        users: {
            [config.swagger.user]: config.swagger.password,
        },
        challenge: true
    }), swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};