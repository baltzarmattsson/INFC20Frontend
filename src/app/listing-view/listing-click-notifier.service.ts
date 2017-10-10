import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";

import { Listing } from "../model/entities/listing.model";

@Injectable()
export class ListingClickNotifierService {

    public listingClick = new Subject<Listing>();
    public editListingClick = new Subject<Listing>();

    public onListingClick(listing: Listing) {
        this.listingClick.next(listing);
    }

    public onEditListingClick(listing: Listing) {
        this.editListingClick.next(listing);
    }
}