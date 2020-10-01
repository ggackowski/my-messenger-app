import { User } from './user.model';

export interface Message {
    date: Date;
    content: string;
    author: User;
}