import { Injectable } from "@angular/core";
import { Message } from "primeng/primeng";
import { Subject } from "rxjs/Subject";

@Injectable()
export class ResponseMessageService {

	public responseMessageSubject = new Subject<string>();
	public responseErrorMessageSubject = new Subject<string>();

	constructor() {}

	public setSuccessMessageWithTimeout(responseMessages: Message[], message: string) {
        this._setMessageWithTimeout(responseMessages, "success", "Success!", message);
    }		
    
    /**
     * @param severity "success", "info", "warn", "error"
     */
    public setErrorMessageWithTimeout(responseMessages: Message[], message: string) {
        this._setMessageWithTimeout(responseMessages, "warn", "Something went wrong", message);
    }

    private _setMessageWithTimeout(responseMessages: Message[], severity: string, summary: string, message: string) {

		let msg: Message = {
			severity: severity,
			summary: summary,
			detail: message
		}

		responseMessages.push(
			msg
		);

		setTimeout(() => {
			responseMessages.splice(responseMessages.indexOf(msg));
		}, 5000);
    }

}

