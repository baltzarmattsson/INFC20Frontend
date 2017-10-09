import { Component } from '@angular/core';
import { AuthService } from "../auth/auth.service";
import { RedirectorService, Route } from "../redirector.service";

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'profile.component.html',
    styleUrls: ['profile.component.scss']
})
export class ProfileComponent {

    constructor(private auth: AuthService,
        private redirector: RedirectorService) {}

    ngOnInit() {

        // if (!this.auth.isAuthenticated()) {
        //     this.redirector.redirectTo(Route.PROFILE
        // }
    }

}
