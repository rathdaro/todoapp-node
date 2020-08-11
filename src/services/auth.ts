import { Service, Inject } from 'typedi';
import jwt from 'jsonwebtoken';
import MailerService from './mailer';
import config from '../config';
import bcrypt from 'bcrypt';
import { IUser, IUserInputDTO } from '../interfaces/IUser';
import { EventDispatcher, EventDispatcherInterface } from '../decorators/eventDispatcher';
import events from '../subscribers/events';
import { Logger } from 'winston';

@Service()
export default class AuthService {
    constructor(
        @Inject('userModel') private userModel : Models.UserModel,
        private mailer: MailerService,
        @Inject('logger') private logger: Logger,
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
    ){}

    public async SignUp(userInputDTO: IUserInputDTO): Promise<{ user: IUser; token: string }> {
        try {

            this.logger.silly('Hashing password');
            const saltRounds = 10;
            const salt = bcrypt.genSaltSync(saltRounds);
            const hashedPassword = bcrypt.hashSync(userInputDTO.password, salt);

            this.logger.silly('Creating user db record');
            const userRecord = await this.userModel.create({
                ...userInputDTO,
                password: hashedPassword,
            });
            this.logger.silly('Generating JWT');
            const token = this.generateToken(userRecord);

            if(!userRecord) {
                throw new Error('User cannot be created');
            }
            // this.logger.silly('Sending welcome email');
            // await this.mailer.SendWelcomeEmail(userRecord.email);
            // this.eventDispatcher.dispatch(events.user.signUp, { user: userRecord});

            const user = userRecord.toObject();
            Reflect.deleteProperty(user, 'password');
            Reflect.deleteProperty(user, 'salt');
            return { user, token };
        } catch (e) {
            this.logger.error("AuthServiceSignUpError : %o", e);
            throw e;
        }
    }

    public async SignIn(email: string, password: string): Promise<{ user: IUser, token: string}> {
        try {

        } catch (e) {
            this.logger.error('AuthServiceSignInError : %o', e);
            throw e;
        }
        const userRecord  = await this.userModel.findOne({ email });
        if(!userRecord) {
            throw new Error('User not registered');
        }
        this.logger.silly('Checking password');
        const validPassword = await bcrypt.compareSync(password, userRecord.password);
        if (validPassword) {
            this.logger.silly('Password is valid!');
            this.logger.silly('Generating JWT');
            const token = this.generateToken(userRecord);

            const user = userRecord.toObject();
            Reflect.deleteProperty(user, 'password');

            return { user, token };
        } else {
            throw new Error('Invalid Password');
        }
    }

    public Logout(user: any) {
        this.logger.silly(`Logout by removing JWT for userId: ${user._id}`);
    }

    private generateToken(user: any) {
        const today = new Date();
        const exp = new Date(today);
        exp.setDate(today.getDate() + 60);

        this.logger.silly(`Sign JWT for userId: ${user._id}`);
        return jwt.sign({
            _id: user._id,
            role: user.role,
            name: user.name,
            exp: exp.getTime() / 1000,
        }, config.jwtSecret,);
    }
}