import { Component, Input } from '@angular/core';
import { ListingClickNotifierService } from "./listing-click-notifier.service";
import { Listing } from "../model/entities/listing.model";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
    moduleId: module.id.toString(),
    selector: 'listing-view',
    templateUrl: 'listing-view.component.html',
    styleUrls: ['listing-view.component.scss']
})
export class ListingViewComponent {

    @Input()
    listings: Listing[] = [];

    @Input()
    showTileView: boolean = true;

    constructor(private listingClickNotifier: ListingClickNotifierService,
        private sanitizer: DomSanitizer) { }

    onListingClick(listing: Listing) {
        if (this.onListingClick) {
            this.listingClickNotifier.onListingClick(listing);
        }
    }

    onEditListingClick(listing: Listing) {
        if (this.onEditListingClick) {
            this.listingClickNotifier.onEditListingClick(listing);
        }
    }
}
