import { Component, Input } from '@angular/core';

import { Listing } from "../model/entities/listing.model";

@Component({
    moduleId: module.id.toString(),
    selector: 'listing-view',
    templateUrl: 'listing-view.component.html',
    styleUrls: ['listing-view.component.scss']
})
export class ListingViewComponent {


    @Input()
    listings: Listing[];

    @Input()
    showTileView: boolean = true;

    @Input()
    onListingClick: (listingId: number) => void;

    @Input()
    onEditListingClick: (listingId: number) => void;


    _onListingClick(listingId: number) {
        console.log("on listing click");
        
        if (this.onListingClick) {
            this.onListingClick(listingId);
        }
    }

    _onEditListingClick(listingId: number) {
        console.log("on edit click");
        
        if (this.onEditListingClick) {
            this.onEditListingClick(listingId);
        }
    }

}
