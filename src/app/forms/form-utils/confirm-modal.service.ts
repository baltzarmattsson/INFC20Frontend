import { Injectable } from "@angular/core";
import { MatDialog, MatButton } from "@angular/material";

import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";

import { ConfirmModalComponent } from "./confirm-modal.component";

@Injectable() 
export class ConfirmModalService {

	constructor(private dialog: MatDialog) {}

	confirm(options?: { title: string, content: string, continueButtonText: string, cancelButtonText: string}): Observable<boolean> {
		let dialogRef = this.dialog.open(ConfirmModalComponent);
		
		if (options && options.title && options.content && options.continueButtonText && options.cancelButtonText)
			dialogRef.componentInstance.initData(
				options.title,
				options.content,
				options.continueButtonText,
				options.cancelButtonText
		);
		

		return dialogRef.afterClosed();
	}
}