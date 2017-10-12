import { Injectable } from "@angular/core";
import { Message } from "primeng/primeng";

@Injectable()
export class ResponseMessageService {

	constructor() {}

	public setSuccessMessageWithTimeout(responseMessages: Message[], detail: string) {
		responseMessages.push(
			{
				severity: "success", 
				summary: "Success!", 
				detail: detail 
			}
		);

		setTimeout(() => {
			responseMessages.length = 0;
		}, 5000);
	}			

}

