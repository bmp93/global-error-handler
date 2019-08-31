import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SlackService {

  private webHook = 'https://hooks.slack.com/services/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';
  private headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

  constructor(private http: HttpClient) { }

  postErrorOnSlack(error: Error): void {
    const message = {
      channel: '#angular',
      text: error.message,
      attachments: [
        {
          author_name: window.location.href,
          color: 'danger',
          title: 'Trace',
          text: error.stack
        }
      ]
    };

    this.http.post(this.webHook, message, { headers: this.headers, responseType: 'text' }).subscribe();
  }
}
