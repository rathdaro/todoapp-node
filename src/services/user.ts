import { Service, Inject } from 'typedi';
import { IUser } from '../interfaces/IUser';

@Service()
export default class UserService {
    constructor(
        @Inject('userModel') private userModel: Models.UserModel,
        @Inject('logger') private logger: any
    ) { }

    public async UpdateUserInfo(): Promise<void> {
        // TODO update user info
    }
}