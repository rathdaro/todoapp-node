import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const swaggerDocument = YAML.load('./swagger.yaml');

export default (app: Router) => {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};