import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInputComponent } from '../user-input/user-input.component';
import { MsgDisplayComponent } from '../msg-display/msg-display.component';
import { Message } from '../models/message.model';
import { ConversationService } from '../services/conversation.service';
import { ActivatedRoute } from '@angular/router';
import { Conversation } from '../models/conversation.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat-interface',
  standalone: true,
  imports: [CommonModule, UserInputComponent, MsgDisplayComponent],
  templateUrl: './chat-interface.component.html',
  styleUrl: './chat-interface.component.scss',
  providers: [ConversationService],
})
export class ChatInterfaceComponent implements OnInit, OnDestroy {
  currentConversation: Conversation | null = null;
  private subscriptions: Subscription[] = [];

  constructor(
    private conversationService: ConversationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.route.params.subscribe({
        next: (params) => {
          const conversationId = params['id'];
          if (conversationId) {
            this.conversationService.setCurrentConversation(conversationId);
          } else {
            this.conversationService.createNewConversation();
          }
        },
        error: (err) => console.error('Error in route params:', err),
      })
    );

    this.subscriptions.push(
      this.conversationService.getCurrentConversation().subscribe({
        next: (conversation) => {
          console.log('Received current conversation:', conversation);

          this.currentConversation = conversation;
        },
        error: (err) =>
          console.error('Error getting current conversation:', err),
      })
    );
  }

  onMessageSent(content: string) {
    console.log('Sending message:', content);

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      timestamp: new Date(),
      isUser: true,
      sender: 'user',
      type: 'text',
      status: 'sending',
    };
    this.conversationService.addMessageToCurrentConversation(userMessage);

    this.subscriptions.push(
      this.conversationService.sendMessage(content).subscribe({
        next: (responseContent: string) => {
          const aiMessage: Message = {
            id: Date.now().toString(),
            content: responseContent,
            timestamp: new Date(),
            isUser: false,
            sender: 'ai',
            type: 'text',
            status: 'sent',
          };
          this.conversationService.addMessageToCurrentConversation(aiMessage);
          // Update user message status to 'sent'
          userMessage.status = 'sent';
          // this.conversationService.addMessageToCurrentConversation({
          //   ...userMessage,
          // });
        },
        error: (error) => {
          console.error('Error:', error);
          const errorMessage: Message = {
            id: Date.now().toString(),
            content: 'Sorry, there was an error processing your request.',
            timestamp: new Date(),
            isUser: false,
            sender: 'ai',
            type: 'text',
            status: 'error',
          };
          this.conversationService.addMessageToCurrentConversation(
            errorMessage
          );
          // Update user message status to 'error'
          userMessage.status = 'error';
          this.conversationService.addMessageToCurrentConversation({
            ...userMessage,
          });
        },
      })
    );
  }

  ngOnDestroy() {
    // Unsubscribe from all subscriptions to prevent memory leaks
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
