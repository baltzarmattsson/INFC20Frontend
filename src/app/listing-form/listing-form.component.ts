import { Component } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";

import { AuthService } from "../auth/auth.service";
import { RedirectorService } from "../redirector.service";
import { Model } from "../model/repository.model";
import { Listing } from "../model/entities/listing.model";

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'listing-form.component.html',
    styleUrls: ['listing-form.component.scss']
})
export class ListingFormComponent {

    form: FormGroup;

    private responseMessages: string[] = [];

    private listingNumber: any;
    private listing: Listing = new Listing();
    private originalListing: Listing = new Listing();

    private editing: boolean = false;

    constructor(
        private model: Model,
        private activeRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private redirector: RedirectorService,
        private auth: AuthService
    ) {}

    ngOnInit() {

        this.form = this.formBuilder.group({
            "title": ["", Validators.required],
            "description": ["", Validators.required],
            "amount": ["", Validators.required],
            "enddate": ["", Validators.required],
            "image": ["", Validators.required]
        });

        this.activeRoute.params.subscribe((params: Params) => {

            this.editing = params["mode"] == "edit";
            this.listingNumber = params["listingid"];

            if (this.listingNumber != undefined) {
                this.model.getListings().subscribe((listings: Listing[]) => {
                    (<any>Object).assign(this.listing, listings.filter(l => l.Number == this.listingNumber)[0]);
                });
            }

        });
    }


    submitForm() {
        if (this.form.valid && this.auth.isAuthenticated()) {
            console.log("VALID", this.listing);
            
        } else {
            console.log("INVALID", this.form);
            
        }
    }

    private uploadPicture() {

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


}
