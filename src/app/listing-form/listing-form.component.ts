import { Component } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";

import { Message } from "primeng/primeng";

import { AuthService } from "../auth/auth.service";
import { RedirectorService } from "../redirector.service";
import { ResponseMessageService } from "../response-message/response-message.service";
import { Model } from "../model/repository.model";
import { Listing } from "../model/entities/listing.model";

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'listing-form.component.html',
    styleUrls: ['listing-form.component.scss']
})
export class ListingFormComponent {

    form: FormGroup;

    private responseMessages: Message[] = [];

    private listingNumber: any;
    private listing: Listing = new Listing();
    private originalListing: Listing = new Listing();

    private editing: boolean = false;

    constructor(
        private model: Model,
        private activeRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private redirector: RedirectorService,
        private auth: AuthService,
        private responseMessageService: ResponseMessageService
    ) {}

    ngOnInit() {

        this.form = this.formBuilder.group({
            "title": ["", Validators.required],
            "description": ["", Validators.required],
            "amount": ["", Validators.required],
            "enddate": ["", Validators.required],
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


    submitForm() {
        if (this.form.valid && this.auth.isAuthenticated() && this.auth.getUserEmail()) {
            console.log("VALID", this.listing);

            this.listing.Email = this.auth.getUserEmail();

            this.responseMessageService.setSuccessMessageWithTimeout(
                this.responseMessages,
                "Listing saved!"
            );

            // this.model.saveListing(this.listing, this.editing).subscribe((listing: Listing) => {
            //     if (listing) 
            //         (<any>Object).assign(this.listing, listing);
            //     (<any>Object).assign(this.originalListing, this.listing);


            // }); 
            
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
