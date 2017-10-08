import { Component } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";

import { Model } from "../model/repository.model";
import { Listing } from "../model/entities/listing.model";
import { RedirectorService, Route } from "../redirector.service";

@Component({
    moduleId: module.id.toString(),
    selector: 'detailed-listing',
    templateUrl: 'detailed-listing.component.html',
    styleUrls: ['detailed-listing.component.css']
})
export class DetailedListingComponent {

    private listingId: any;

    private listing: Listing = new Listing();

    constructor(
        private model: Model,
        private activeRoute: ActivatedRoute,
        private redirector: RedirectorService
    ) {}

    ngOnInit() {

        this.activeRoute.params.subscribe((params: Params) => {
            
            this.listingId = params["listingid"];

            this.model.getListings().subscribe((listings: Listing[]) => {
                
                this.listing = listings.filter(l => l.Number == this.listingId)[0];

            });
        });

    }

    redirectToEditListing() {
        if (this.listing && this.listing.Number) {
            this.redirector.redirectTo(Route.LISTING_EDIT, this.listing.Number);
        }
    }

}
