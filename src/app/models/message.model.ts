export interface Message {
  id: string;
  content: string;
  timestamp: Date;
  isUser: boolean;
  sender: 'user' | 'ai';
  type: 'text' | 'image' | 'code';
  status?: 'sending' | 'sent' | 'error';
}
