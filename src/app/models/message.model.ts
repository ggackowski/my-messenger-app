import { User } from './user.model';

export enum MessageStatus {
    NOTSENT, SENT, DELIVERED, SEEN
  };

export interface Message {
    date: Date;
    content: string;
    author: User;
    status: MessageStatus;
}

export interface DataMessage {
    messageId: string;
    date: string;
    content: string;
    author: User;
    status: MessageStatus;
}