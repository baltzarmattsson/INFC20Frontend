import { Component } from '@angular/core';
import { AuthService } from "../auth/auth.service";
import { RedirectorService, Route } from "../redirector.service";
import { Model } from "../model/repository.model";
import { Listing } from "../model/entities/listing.model";
import { ListingClickNotifierService } from "../listing-view/listing-click-notifier.service";

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'profile.component.html',
    styleUrls: ['profile.component.scss']
})
export class ProfileComponent {

    private myListings: Listing[];

    constructor(private auth: AuthService,
        private redirector: RedirectorService,
        private model: Model,
        private listingClickNotifier: ListingClickNotifierService) { }

    ngOnInit() {

        this.listingClickNotifier.editListingClick.subscribe((listing: Listing) => {
            this.onEditListingClick(listing);
        });


        this.initListings();
    }

    private initListings() {

        if (this.auth.isAuthenticated()) {
            // this.model.getListingsByEmail(this.auth.getUserEmail()).subscribe((myListings: Listing[]) => {
            //     this.myListings = myListings.filter(listing => listing.UserEmail == this.auth.getUserEmail());
            // });
        }
    }

    private onListingClick(listing: Listing) {
        if (listing) {
            this.redirector.redirectTo(Route.LISTING_VIEW, listing.Id);
        }
    }

    private onEditListingClick(listing: Listing) {
        if (listing) {
            this.redirector.redirectTo(Route.LISTING_EDIT, listing.Id);
        }
    }

}
