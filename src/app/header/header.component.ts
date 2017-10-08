import { Component } from '@angular/core';
import { MatInputModule } from "@angular/material";

import { RedirectorService, Route } from "../redirector.service";

@Component({
    moduleId: module.id.toString(),
    selector: 'header-component',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.css']
})
export class HeaderComponent {

    constructor(private redirector: RedirectorService) {}

    redirectToHome() {
        this.redirector.redirectTo(Route.HOME);
    }

    redirectToPublishListing() {
        this.redirector.redirectTo(Route.LISTING_CREATE);
    }

    redirectToMyBids() {
        this.redirector.redirectTo(Route.MY_BIDS);
    }

    redirectToProfile() {
        this.redirector.redirectTo(Route.PROFILE);
    }

}
