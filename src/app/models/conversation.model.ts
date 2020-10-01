import { Message } from './message.model';
import { User } from './user.model';

export interface Conversation {
    conversationId: string;
    messages: Message[];
    participants: User[];
}