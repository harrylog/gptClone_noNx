// import { ChangeDetectionStrategy } from '@angular/core';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Message } from '../models/message.model';

@Component({
  selector: 'app-msg-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './msg-display.component.html',
  styleUrl: './msg-display.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MsgDisplayComponent {

  @Input() message!: Message;

}
