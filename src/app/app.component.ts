import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ChatInterfaceComponent } from './chat-interface/chat-interface.component';

@Component({
  standalone: true,
  imports: [RouterModule, MatButtonModule, ChatInterfaceComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'chatGpt-chat';
}
