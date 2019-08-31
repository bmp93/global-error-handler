import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../error.service';
import { NotificationService } from '../notification.service';
import { SlackService } from '../slack.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandler implements ErrorHandler {

  constructor(
    private errorService: ErrorService,
    private notifier: NotificationService,
    private slackService: SlackService
  ) { }

  handleError(error: any) {
    debugger
    let message;
    if (error instanceof HttpErrorResponse) {
      // Server error
      message = this.errorService.getServerErrorMessage(error);
      this.notifier.showError(message);
    } else if (error instanceof Error) {
      // Client Error
      message = this.errorService.getClientErrorMessage(error);
      this.notifier.showError(message);
    } else if (error instanceof ReferenceError) {
      // Reference error
      message = this.errorService.getGeneralErrorMessage(error);
      this.notifier.showError(message);
    } else if (error instanceof TypeError) {
      message = this.errorService.getGeneralErrorMessage(error);
      this.notifier.showError(message);
    }
    // Always log errors
    // this.slackService.postErrorOnSlack(error);
    console.log(error);
  }
}
