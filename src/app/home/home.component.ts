import { Component,	OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { DatePipe } from "@angular/common";

import { Model } from "../model/repository.model";
import { Listing } from "../model/entities/listing.model";
import { RedirectorService, Route } from "../redirector.service";
import { ListingClickNotifierService } from "../listing-view/listing-click-notifier.service";

@Component({
  /**
   * The selector is what angular internally uses
   * for `document.querySelectorAll(selector)` in our index.html
   * where, in this case, selector is the string 'home'.
   */
	selector: 'home',
	styleUrls: ['./home.component.css'],
	templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

	private listings: any[] = [];

	constructor(private model: Model,
        private redirector: RedirectorService,
        private listingClickNotifier: ListingClickNotifierService) { }
	
	public ngOnInit() {

        this.listingClickNotifier.listingClick.subscribe((listing: Listing) => {
            this.onListingClick(listing);
        });

		this.model.getListings().subscribe(listings => {
			(<any>Object).assign(this.listings, listings);
		});
    }
    
	onListingClick(listing: Listing) {
		if (listing)
		    this.redirector.redirectTo(Route.LISTING_VIEW, listing.Number);
	}
}
