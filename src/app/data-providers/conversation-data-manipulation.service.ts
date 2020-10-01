import { Message } from '../models/message.model';

export interface ConversationDataManipulationService {
    getConversationMessagesByConversationId(conversationId: string): Message[];
}