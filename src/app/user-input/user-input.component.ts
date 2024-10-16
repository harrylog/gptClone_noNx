// import { ChangeDetectionStrategy } from '@angular/core';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInputComponent {
  messageForm: FormGroup;

  @Output() messageSent = new EventEmitter<string>();

  constructor(private fb: FormBuilder) {
    this.messageForm = this.fb.group({
      message: [''],
    });
  }

  onSubmit() {
    if (this.messageForm.valid) {
      const message = this.messageForm.get('message')?.value;
      this.messageSent.emit(message);
      this.messageForm.reset();
    }
  }
}
