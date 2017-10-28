import { Component } from '@angular/core';
import { MatInputModule } from "@angular/material";

import { RedirectorService, Route } from "../redirector.service";
import { HeaderService } from "./header.service";

@Component({
    moduleId: module.id.toString(),
    selector: 'header-component',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.css']
})
export class HeaderComponent {

    filterString = "";

    constructor(private redirector: RedirectorService,
        private headerService: HeaderService) {}

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

    onFilterChange() {
        this.headerService.filterStringSubject.next(this.filterString);
    }

}
