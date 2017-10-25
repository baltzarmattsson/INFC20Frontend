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

    private sanitizedImageUrlForListingId: { [listingId: number]: string } = [];

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

    ngOnChanges(changes) {        
        if (changes && changes.listings && changes.listings.currentValue) {

            let listings = [];
            (<any>Object).assign(listings, changes.listings.currentValue);
            console.log("LSSLSL", listings, changes.listings.currentValue);
            

            listings.forEach(listing => {
                this.sanitizer.bypassSecurityTrustResourceUrl(listing.ImgUrl);
                this.sanitizer.bypassSecurityTrustStyle(listing.ImgUrl);
                this.sanitizer.bypassSecurityTrustUrl(listing.ImgUrl);
                this.sanitizedImageUrlForListingId[listing.Id] = listing.ImgUrl;
            });
        }
    }


}
