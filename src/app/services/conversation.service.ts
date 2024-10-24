import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { OpenAIResponse } from '../models/OpenAIResponse.model';
import { Conversation } from '../models/conversation.model';
import { Message } from '../models/message.model';
@Injectable({
  providedIn: 'root',
})
export class ConversationService {
  private apiUrl = 'https://api.openai.com/v1/chat/completions';
  private conversations = new BehaviorSubject<Conversation[]>([]);
  private currentConversation = new BehaviorSubject<Conversation | null>(null);

  constructor(private http: HttpClient) {}

  sendMessage(message: string): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${environment.openaiApiKey1}`,
    });

    const body = {
      model: 'gpt-4o-mini', // Make sure this matches the model you're using
      messages: [{ role: 'user', content: message }],
      temperature: 0.7,
    };

    return this.http.post<OpenAIResponse>(this.apiUrl, body, { headers }).pipe(
      map((response) => {
        if (response.choices && response.choices.length > 0) {
          return response.choices[0].message.content;
        } else {
          throw new Error('No response content found');
        }
      })
    );
  }

  getConversations(): Observable<Conversation[]> {
    console.log('history');

    return this.conversations.asObservable();
  }

  getCurrentConversation(): Observable<Conversation | null> {
    return this.currentConversation.asObservable();
  }
  createNewConversation(): void {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: 'New Conversation',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const currentConversations = this.conversations.getValue();
    this.conversations.next([newConversation, ...currentConversations]);
    this.currentConversation.next(newConversation);
    console.log('New conversation created:', newConversation);
    console.log('Updated conversations list:', this.conversations.getValue());
  }

  addMessageToCurrentConversation(message: Message): void {
    const current = this.currentConversation.getValue();
    if (current) {
      const updatedConversation = {
        ...current,
        messages: [...current.messages, message],
        updatedAt: new Date(),
      };
      this.currentConversation.next(updatedConversation);
      this.updateConversationsList(updatedConversation);
      console.log('Message added to conversation:', updatedConversation);
      console.log('Updated conversations list:', this.conversations.getValue());
    } else {
      console.warn('No current conversation found');
    }
  }

  private updateConversationsList(updatedConversation: Conversation): void {
    const currentList = this.conversations.getValue();
    const updatedList = currentList.map((conv) => 
      conv.id === updatedConversation.id ? updatedConversation : conv
    );
    this.conversations.next(updatedList);
  }

  setCurrentConversation(conversationId: string): void {
    const conversation = this.conversations
      .getValue()
      .find((c) => c.id === conversationId);
    if (conversation) {
      this.currentConversation.next(conversation);
    }
  }
}
