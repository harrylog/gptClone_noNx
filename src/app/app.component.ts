import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ChatInterfaceComponent } from './chat-interface/chat-interface.component';
import { ConversationHistoryComponent } from './conversation-history/conversation-history.component';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    MatButtonModule,
    ChatInterfaceComponent,
    ConversationHistoryComponent,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'chatGpt-chat';
}
