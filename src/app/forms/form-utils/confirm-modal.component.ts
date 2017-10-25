import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material";

@Component({
	moduleId: module.id.toString(),
	selector: "pending-changes-modal",
	templateUrl: "confirm-modal.component.html",
	styleUrls: ["confirm-modal.component.css"]

})
export class ConfirmModalComponent {

	constructor(public dialogRef: MatDialogRef<ConfirmModalComponent>) {}

	public title: string = "Unsaved Changes";
	public content: string = "Are you sure you want to navigate away and lose your changes?";
	public continueButtonText: string = "Yes, leave this page";
	public cancelButtonText: string = "No, stay on this page";

	public initData(title: string, content: string, continueButtonText: string, cancelButtonText: string) {
		this.title = title;
		this.content = content;
		this.continueButtonText = continueButtonText;
		this.cancelButtonText = cancelButtonText;
	}

	// Unsaved Changes
	// What would you like to do?
	discard() {
		this.dialogRef.close(true);
	}

	cancel() {
		this.dialogRef.close(false);
	}
}