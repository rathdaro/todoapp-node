import { Service, Inject } from 'typedi';
import { IUserInputDTO } from '../interfaces/IUser';
import bcrypt from 'bcrypt';


@Service()
export default class UserService {
    constructor(
        @Inject('userModel') private userModel: Models.UserModel,
        @Inject('logger') private logger: any
    ) { }

    public async UpdateUserInfo(user_id: string, userInputDTO: IUserInputDTO): Promise<any> {
        try {
            const saltRounds = 10;
            const salt = bcrypt.genSaltSync(saltRounds);
            const hashedPassword = bcrypt.hashSync(userInputDTO.password, salt);

            const userRecord = await this.userModel.updateOne({ _id: user_id}, { ...userInputDTO, password: hashedPassword});
            if (!userRecord) {
                throw new Error('Error updating user');
            } else {
                return { message: 'success'};
            }
        } catch (e) {
            this.logger.error(e);
            throw e;
        }
    }
}