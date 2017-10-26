import { Component } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";

import { Model } from "../model/repository.model";
import { Listing } from "../model/entities/listing.model";
import { Bid } from "../model/entities/bid.model";
import { RedirectorService, Route } from "../redirector.service";
import { AuthService } from "../auth/auth.service";

import { ComponentCanDeactivate } from "../forms/form-utils/pending-changes.guard";

@Component({
    moduleId: module.id.toString(),
    selector: 'detailed-listing',
    templateUrl: 'detailed-listing.component.html',
    styleUrls: ['detailed-listing.component.css']
})
export class DetailedListingComponent implements ComponentCanDeactivate {

    private listingId: any;
    private listing: Listing = new Listing();

    private valueInBiddingInput: number;
    private originalValueInBiddingInput: number;

    constructor(
        private model: Model,
        private activeRoute: ActivatedRoute,
        private redirector: RedirectorService,
        private auth: AuthService
    ) {}

    ngOnInit() {

        this.activeRoute.params.subscribe((params: Params) => {
            this.listingId = params["listingid"];
            this.updateListing();
            
        });
    }

    canDeactivate(): boolean {
        let hasChanges: boolean = this.valueInBiddingInput != undefined && this.valueInBiddingInput != this.originalValueInBiddingInput;
        return !hasChanges;
    }

    redirectToEditListing() {
        if (this.listing && this.listing.Id) {
            this.redirector.redirectTo(Route.LISTING_EDIT, this.listing.Id);
        }
    }

    addBid() {
        let convertedAmount = Number(this.valueInBiddingInput);

        if (convertedAmount) {
            let bid = new Bid(
                this.auth.getUserEmail(), 
                this.listingId,
                this.valueInBiddingInput,
                null
            );

<<<<<<< HEAD
            console.log(bid);
            this.model.saveBid(bid, false).subscribe(() => {
                this.updateListing();
                this.originalValueInBiddingInput = this.valueInBiddingInput;
            });

=======
            this.model.saveBid(bid, false).subscribe(bid => {
                // this.updateListing();
            });

            console.log(bid);
>>>>>>> ab7093c6ba0184fef8e8fc71d94ad57dcd7d9a18
            
        } else {
            // TODO
            console.log("not valid input");
<<<<<<< HEAD
=======
            
>>>>>>> ab7093c6ba0184fef8e8fc71d94ad57dcd7d9a18
        }
        
    }

    private updateListing() {
        if (this.listingId != undefined) {
            this.model.getListing(this.listingId).subscribe((listing: Listing) => {
                console.log(listing);
                (<any>Object).assign(this.listing, listing);
            });
        }
    }

}
