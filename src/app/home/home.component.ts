import { Component,	OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { DatePipe } from "@angular/common";

import { Model } from "../model/repository.model";
import { Listing } from "../model/entities/listing.model";
import { RedirectorService, Route } from "../redirector.service";

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
		private redirector: RedirectorService) { }
	
	public ngOnInit() {
		this.model.getListings().subscribe(listings => {
			(<any>Object).assign(this.listings, listings);
			console.log(listings);
			
		});


	}

	redirectToListing(listing: Listing) {
		console.log(listing);
		
		this.redirector.redirectTo(Route.LISTING_VIEW, listing.Number);
	}
}
