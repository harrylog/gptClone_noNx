import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Conversation } from '../models/conversation.model';
import { ConversationService } from '../services/conversation.service';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, map, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-conversation-history',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './conversation-history.component.html',
  styleUrl: './conversation-history.component.scss',
})
export class ConversationHistoryComponent implements OnInit, OnDestroy {
  conversations$: Observable<Conversation[]>;
  currentConversationId$: Observable<string | null>;
  private subscription: Subscription = new Subscription();

  constructor(private conversationService: ConversationService) {
    console.log('history')
    this.conversations$ = this.conversationService.getConversations();
    this.currentConversationId$ = this.conversationService.getCurrentConversation().pipe(
      map(conversation => conversation ? conversation.id : null)
    );
  }

  ngOnInit() {
    this.subscription.add(
      this.conversations$.subscribe(conversations => {
        console.log('Conversations updated:', conversations);
      })
    );

    this.subscription.add(
      this.currentConversationId$.subscribe(id => {
        console.log('Current conversation id changed:', id);
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  startNewConversation() {
    this.conversationService.createNewConversation();
  }
}