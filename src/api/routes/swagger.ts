import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsondoc from 'swagger-jsdoc';

export default (app: Router) => {
    const options = {
        swaggerDefinition: {
            openapi: "3.0.0",
            info: {
                title: "Todoapp Web API",
                version: "1.0.0",
                description: "Just a normal Todoapp API",
                license: {
                    name: "MIT",
                    url: "https://todoapp.demo.com"
                },
                contact: {
                    
                }
            }
        }
    }
    const specs = swaggerJsondoc(options);
    app.use('/api-docs', swaggerUi.serve);
    
    app.get("/api-docs", swaggerUi.setup(specs, {
        explorer: true
    }));
};