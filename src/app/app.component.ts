import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import "hammerjs";

import { Message } from "primeng/primeng";
import { ResponseMessageService } from "./response-message/response-message.service";
import { HttpErrorHandlerService } from "./model/http-error-handler.service";

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./app.component.css'],
  templateUrl: "./app.component.html"
})
export class AppComponent {

    private messages: Message[] = [];

    constructor(
        private responseMessageService: ResponseMessageService,
        private errorHandler: HttpErrorHandlerService
    ) {}

    ngOnInit() {

        this.responseMessageService.responseMessageSubject.subscribe((message) => {
            this.responseMessageService.setSuccessMessageWithTimeout(this.messages, message);
        })

        this.errorHandler.onErrorSubject.subscribe((message: string) => {
            this.responseMessageService.setErrorMessageWithTimeout(this.messages, message);
        });

        this.responseMessageService.responseErrorMessageSubject.subscribe(error => {
            this.responseMessageService.setErrorMessageWithTimeout(this.messages, error);
        })
    }

 }