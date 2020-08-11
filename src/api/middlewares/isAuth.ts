import jwt from 'express-jwt';
import config from '../../config';

const getTokenFromHeader = (req: any) => {
    if(
        (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') ||
        (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
    ) {
        return req.headers.authorization.split(' ')[1];
    }
    return null;
};

const isAuth = jwt({
    secret: config.jwtSecret,
    userProperty: 'token',
    getToken: getTokenFromHeader,
    algorithms: ['HS256']
});

export default isAuth;