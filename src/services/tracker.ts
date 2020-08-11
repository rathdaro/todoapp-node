import { Service, Inject } from 'typedi';
import { IUser } from '../interfaces/IUser';

@Service()
export default class TrackerService {
    constructor(
        @Inject('emailClient') private emailClient: any
    ){ }
}