import { Component } from '@angular/core';
import { AuthService } from "../auth/auth.service";
import { RedirectorService, Route } from "../redirector.service";
import { Model } from "../model/repository.model";
import { Listing } from "../model/entities/listing.model";

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'profile.component.html',
    styleUrls: ['profile.component.scss']
})
export class ProfileComponent {

    private myListings: Listing[];

    constructor(private auth: AuthService,
        private redirector: RedirectorService,
        private model: Model) { }

    ngOnInit() {
        this.initListings();
    }

    private initListings() {

        if (this.auth.isAuthenticated()) {
            this.model.getListingsByEmail(this.auth.getUserEmail()).subscribe((myListings: Listing[]) => {
                this.myListings = myListings.filter(listing => listing.Email == this.auth.getUserEmail());
            });
        }
    }

}
