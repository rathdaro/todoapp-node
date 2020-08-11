import mongoose from 'mongoose';
import { ITodo } from '../interfaces/ITodo';

const Todo = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter a title'],
        index: true,
    },
    info:  String,
    complete: Boolean
}, { timestamps: true });

export default mongoose.model<ITodo & mongoose.Document>('Todo', Todo);