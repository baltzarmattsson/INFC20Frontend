import { Component } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute, Params } from "@angular/router";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";

import { Message } from "primeng/primeng";

import { ComponentCanDeactivate } from "../form-utils/pending-changes.guard";
import { AuthService } from "../../auth/auth.service";
import { RedirectorService, Route } from "../../redirector.service";
import { ResponseMessageService } from "../../response-message/response-message.service";
import { Model } from "../../model/repository.model";
import { Listing } from "../../model/entities/listing.model";

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'listing-form.component.html',
    styleUrls: ['listing-form.component.scss']
})
export class ListingFormComponent implements ComponentCanDeactivate {

    form: FormGroup;

    private responseMessages: Message[] = [];

    private listingId: any;
    private listing: Listing = new Listing();
    private originalListing: Listing = new Listing();

    private editing: boolean = false;

    constructor(
        private model: Model,
        private activeRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private redirector: RedirectorService,
        private auth: AuthService,
        private responseMessageService: ResponseMessageService,
        private sanitizer: DomSanitizer
    ) { }

    ngOnInit() {

        this.form = this.formBuilder.group({
            "title": ["", Validators.required],
            "description": ["", Validators.required],
            "amount": ["", Validators.required],
            "enddate": ["", Validators.required],
            "image": ["",]
        });

        this.activeRoute.params.subscribe((params: Params) => {

            this.editing = params["mode"] == "edit";
            this.listingId = params["listingid"];

            if (this.listingId != undefined) {
                this.model.getListing(this.listingId).subscribe((listing: Listing) => {
                    console.log(listing);
                    (<any>Object).assign(this.listing, listing);
                });
            }

        });
    }

    canDeactivate(): boolean {
        let hasChanges = false;

        let attributesToCheck = [
            "Title",
            "Description",
            "End_Date",
            "Amount"
        ];

        attributesToCheck.forEach(att => {
            if (this.listing[att] != this.originalListing[att])
                hasChanges = true;
        });

        return !hasChanges;
    }


    submitForm() {
        if (this.form.valid && this.auth.isAuthenticated() && this.auth.getUserEmail() && this.pictureFile) {
            console.log("VALID", this.listing);

            this.listing.UserEmail = this.auth.getUserEmail();

            if (this.listing.ImgUrl == undefined)
                this.listing.ImgUrl = "";

            this.model.saveListing(this.listing, this.editing).subscribe((listing: Listing) => {
                console.log("SAVED", listing);
                
                if (listing)
                    (<any>Object).assign(this.listing, listing);
                (<any>Object).assign(this.originalListing, this.listing);

                this.model.uploadImageForListing(this.pictureFile, this.listing).subscribe(() => {
                    this.redirector.redirectTo(Route.LISTING_VIEW, this.listing.Id);
                });

                this.responseMessageService.setSuccessMessageWithTimeout(this.responseMessages, "Listing saved!");
            });

        } else {
            console.log("INVALID", this.form);

        }
    }

    private url: any;
    private pictureFile: any;

    fileEvent(event) {
        if (event.target.files && event.target.files[0]) {

            if (this.controlPicture(event.target.files[0])) {

                var reader = new FileReader();

                reader.onload = (event: any) => {
                    this.url = event.target.result;
                }

                reader.readAsDataURL(event.target.files[0]);
                this.pictureFile = event.target.files[0];
            }
        }
    }

    private controlPicture(file: File) {
        console.log(file);
        // TODO - check file endings, dimensions, size, etc.
        return true;
    }

    onDateChange(date: Date) {
        console.log(date);

    }

    private getSafeImageUrl() {
        return this.sanitizer.bypassSecurityTrustUrl(this.listing.ImgUrl);
    }


}
