import { Service, Inject } from 'typedi';
import { IUser } from '../interfaces/IUser';

@Service()
export default class NodemailerService {
    constructor(
        @Inject('nodemailerEmailClient') private notemailerEmailClient
    ){ }

    public async SendWelcomeEmail(email: string) {
        
    }
}