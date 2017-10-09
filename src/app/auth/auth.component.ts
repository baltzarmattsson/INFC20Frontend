import { Component } from "@angular/core";
import { AuthService } from "./auth.service";

@Component({
    moduleId: module.id.toString(),
    selector: "auth",
    templateUrl: "auth.component.html",
    styleUrls: ["auth.component.scss"]
})
export class AuthComponent {

    constructor(private auth: AuthService) {}

    ngOnInit() {
        this.auth.handleAuthentication();
    }

}
