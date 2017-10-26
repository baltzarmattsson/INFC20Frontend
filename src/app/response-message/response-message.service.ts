import { Injectable } from "@angular/core";
import { Message } from "primeng/primeng";

@Injectable()
export class ResponseMessageService {

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
		responseMessages.push(
			{
				severity: severity, 
				summary: summary, 
				detail: message 
			}
		);

		setTimeout(() => {
			responseMessages.length = 0;
		}, 5000);
    }

}

