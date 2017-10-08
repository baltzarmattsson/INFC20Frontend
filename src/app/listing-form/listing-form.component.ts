import { Component } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";

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
        private redirector: RedirectorService
    ) {}

    ngOnInit() {

        this.form = this.formBuilder.group({
            "title": ["", Validators.required],
            "description": ["", Validators.required],
            "amount": ["", Validators.required ],
            "image": ["", ]
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


}
