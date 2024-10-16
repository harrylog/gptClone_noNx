import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { OpenAIResponse } from '../models/OpenAIResponse.model';
@Injectable({
  providedIn: 'root',
})
export class ConversationService {
  private apiUrl = 'https://api.openai.com/v1/chat/completions';

  constructor(private http: HttpClient) {}

  sendMessage(message: string): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${environment.openaiApiKey}`,
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
}
