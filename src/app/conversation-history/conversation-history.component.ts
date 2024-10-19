// import { ChangeDetectionStrategy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Conversation } from '../models/conversation.model';
import { ConversationService } from '../services/conversation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-conversation-history',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './conversation-history.component.html',
  styleUrl: './conversation-history.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConversationHistoryComponent implements OnInit {
  conversations: Conversation[] = [];
  currentConversationId: string | null = null;

  constructor(private conversationService: ConversationService) {}

  ngOnInit() {
    this.conversationService.getConversations().subscribe((conversations) => {
      this.conversations = conversations;
    });
    this.conversationService
      .getCurrentConversation()
      .subscribe((conversation) => {
        this.currentConversationId = conversation?.id || null;
      });
  }

  startNewConversation() {
    this.conversationService.createNewConversation();
  }
}
