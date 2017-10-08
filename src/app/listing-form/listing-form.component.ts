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
        this.activeRoute.params.subscribe((params: Params) => {

            

        });
    }


}
