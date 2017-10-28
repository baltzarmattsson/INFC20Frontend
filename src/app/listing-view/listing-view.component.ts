import { Component, Input } from '@angular/core';
import { ListingClickNotifierService } from "./listing-click-notifier.service";
import { Listing } from "../model/entities/listing.model";
import { DomSanitizer } from "@angular/platform-browser";
import { HeaderService } from "../header/header.service";

@Component({
    moduleId: module.id.toString(),
    selector: 'listing-view',
    templateUrl: 'listing-view.component.html',
    styleUrls: ['listing-view.component.scss']
})
export class ListingViewComponent {

    private filterString = "";
    private filterableAttributes: string[] = [
        "Title",
        "Description"
    ];


    @Input()
    listings: Listing[] = [];

    @Input()
    showTileView: boolean = true;

    constructor(private listingClickNotifier: ListingClickNotifierService,
        private sanitizer: DomSanitizer,
        private headerService: HeaderService) { }

    ngOnInit() {
        this.headerService.filterStringSubject.subscribe(filter => {
            this.filterString = filter;
        });
    }

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
