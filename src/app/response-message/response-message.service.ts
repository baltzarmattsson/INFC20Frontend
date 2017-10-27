import { Injectable } from "@angular/core";
import { Message } from "primeng/primeng";
import { Subject } from "rxjs/Subject";

@Injectable()
export class ResponseMessageService {

	public responseMessageSubject = new Subject<string>();

	constructor() {}

	public setSuccessMessageWithTimeout(responseMessages: Message[], message: string) {
        this._setMessageWithTimeout(responseMessages, "success", "Success!", message);
    }		
    
    /**
     * @param severity "success", "info", "warn", "error"
     */
    public setErrorMessageWithTimeout(responseMessages: Message[], message: string) {
        this._setMessageWithTimeout(responseMessages, "warn", "Woopsidy fucking doo something wen't wrong lolsland", message);
    }

    private _setMessageWithTimeout(responseMessages: Message[], severity: string, summary: string, message: string) {
		// let msg: Message );
		// msg.severity = severity;
		// msg.summary = summary;
		// msg.detail = message;
		// 	severity: severity, 
		// 	summary: summary, 
		// 	detail: message 
		// );

		let msg: Message = {
			severity: severity,
			summary: summary,
			detail: message
		}

		responseMessages.push(
			msg
			// {
			// 	severity: severity, 
			// 	summary: summary, 
			// 	detail: message 
			// }
		);

		setTimeout(() => {
			responseMessages.splice(responseMessages.indexOf(msg));
			// responseMessages.length = 0;
		}, 5000);
    }

}

