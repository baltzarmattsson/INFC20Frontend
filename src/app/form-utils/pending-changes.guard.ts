import { Injectable } from "@angular/core";
import { CanDeactivate } from "@angular/router";

import { Observable } from "rxjs/Observable";

import { ConfirmModalComponent } from "./confirm-modal.component";
import { ConfirmModalService } from "./confirm-modal.service";

export interface ComponentCanDeactivate {
	canDeactivate: () => boolean;
}

@Injectable()
export class PendingChangesGuard implements CanDeactivate<ComponentCanDeactivate> {

	constructor(private confirmModalService: ConfirmModalService) {}

	canDeactivate(component: ComponentCanDeactivate): boolean | Observable<boolean> {
		return component.canDeactivate() ? true : this.confirmModalService.confirm();
	}

}