import mongoose from 'mongoose';
import { IUser } from '../interfaces/IUser';

const User = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a full name'],
        index: true,
    },
    email: { 
        type: String,
        lowercase: true,
        unique: true,
        index: true,
    },
    password: String,
    role: {
        type: String,
        default: 'user',
    },
    todos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Todo'
    }]
},
{ timestamps: true},
);

export default mongoose.model<IUser & mongoose.Document>('User', User);