// import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInputComponent } from '../user-input/user-input.component';
import { MsgDisplayComponent } from '../msg-display/msg-display.component';
import { Message } from '../models/message.model';
import { ConversationService } from '../services/conversation.service';

@Component({
  selector: 'app-chat-interface',
  standalone: true,
  imports: [CommonModule, UserInputComponent, MsgDisplayComponent],
  templateUrl: './chat-interface.component.html',
  styleUrl: './chat-interface.component.scss',
  providers: [ConversationService],

  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatInterfaceComponent {
  messages: Message[] = [];

  constructor(private conversationService: ConversationService) {}

  onMessageSent(content: string) {
    const userMessage: Message = {
      content,
      isUser: true,
      timestamp: new Date(),
      id: Date.now().toString(), // Generate a simple unique id
      sender: 'user',
      type: 'text',
    };
    this.messages.push(userMessage);

    this.conversationService.sendMessage(content).subscribe(
      (responseContent: string) => {
        const aiMessage: Message = {
          content: responseContent,
          isUser: false,
          timestamp: new Date(),
          id: Date.now().toString(), // Generate a simple unique id
          sender: 'ai',
          type: 'text',
        };
        this.messages.push(aiMessage);
      },
      (error) => {
        console.error('Error:', error);
        // Handle error (e.g., display error message to user)
        const errorMessage: Message = {
          content: 'Sorry, there was an error processing your request.',
          isUser: false,
          timestamp: new Date(),
          id: Date.now().toString(),
          sender: 'ai',
          type: 'text',
        };
        this.messages.push(errorMessage);
      }
    );
  }
}
