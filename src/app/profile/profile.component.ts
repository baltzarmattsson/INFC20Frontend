import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { AuthService } from "../auth/auth.service";
import { RedirectorService, Route } from "../redirector.service";
import { Model } from "../model/repository.model";
import { Listing } from "../model/entities/listing.model";
import { User } from "../model/entities/user.model";
import { ListingClickNotifierService } from "../listing-view/listing-click-notifier.service";
import { ComponentCanDeactivate } from "../forms/form-utils/pending-changes.guard";
import { ResponseMessageService } from "../response-message/response-message.service";
import { Message } from "primeng/primeng";

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'profile.component.html',
    styleUrls: ['profile.component.scss']
})
export class ProfileComponent implements ComponentCanDeactivate {

    private form: FormGroup;
    private responseMessages: Message[] = [];

    private user: User = new User();
    private originalUser: User = new User();

    private myListings: Listing[];

    constructor(private auth: AuthService,
        private redirector: RedirectorService,
        private model: Model,
        private listingClickNotifier: ListingClickNotifierService,
        private formBuilder: FormBuilder,
        private responseMessageService: ResponseMessageService) { }

    ngOnInit() {

        this.form = this.formBuilder.group({
            "email": ["", Validators.required],
            "firstname": ["", Validators.required],
            "lastname": ["", Validators.required],
            "address": ["",],
            "password": ["", Validators.required],
        })

        this.listingClickNotifier.editListingClick.subscribe((listing: Listing) => {
            this.onEditListingClick(listing);
        });


        this.initListings();
    }

    private initListings() {

        if (this.auth.isAuthenticated()) {

            this.model.getUser(this.auth.getUserEmail()).subscribe((user: User) => {
                if (user) {
                    (<any>Object).assign(this.user, user);
                    (<any>Object).assign(this.originalUser, this.user);

                    this.model.getListingsByEmail(this.auth.getUserEmail()).subscribe((myListings: Listing[]) => {
                        this.myListings = myListings;
                    });
                }
            })


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

    canDeactivate(): boolean {
        let hasChanges = false;

        let attributesToCheck = [
            "Email",
            "FirstName",
            "LastName",
            "Address",
            "Password"
        ];

        attributesToCheck.forEach(att => {
            if (this.user[att] != this.user[att]) {
                console.log("changes", att);
                hasChanges = true;
            }
        });

        return !hasChanges;
    }

    submitForm() {
        if (this.form.valid) {
            this.model.saveUser(this.user, true).subscribe((user: User) => {
                if (user) {
                    (<any>Object).assign(this.user, user);
                }
                (<any>Object).assign(this.originalUser, this.user);

                this.responseMessageService.setSuccessMessageWithTimeout(this.responseMessages, "Saved!");
            })
        }
    }


}
