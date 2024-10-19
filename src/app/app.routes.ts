import { Route } from '@angular/router';
import { ChatInterfaceComponent } from './chat-interface/chat-interface.component';

export const appRoutes: Route[] = [
  { path: '', redirectTo: '/chat', pathMatch: 'full' },
  { path: 'chat', component: ChatInterfaceComponent },
  { path: 'chat/:id', component: ChatInterfaceComponent },
];
