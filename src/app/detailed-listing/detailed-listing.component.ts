import { Component } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";

import { Model } from "../model/repository.model";
import { Listing } from "../model/entities/listing.model";
import { Bid } from "../model/entities/bid.model";
import { RedirectorService, Route } from "../redirector.service";
import { AuthService } from "../auth/auth.service";

import { ComponentCanDeactivate } from "../forms/form-utils/pending-changes.guard";
import { ResponseMessageService } from "../response-message/response-message.service";

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
        private auth: AuthService,
        public responseMessageService: ResponseMessageService
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

            console.log(bid);
            this.model.saveBid(bid, false).subscribe(() => {
                this.updateListing();
                this.originalValueInBiddingInput = this.valueInBiddingInput;
                this.responseMessageService.responseMessageSubject.next("Bid added!");
            });

            
        } else {
            this.responseMessageService.responseErrorMessageSubject.next("Bid input not valid, only numeric values allowed");
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
