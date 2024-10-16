import { Message } from './message.model';

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
  participants?: {
    user: string;
    ai: string;
  };

}
