// ANGULAR
import { Injectable, Inject, OpaqueToken } from "@angular/core";
import { Http, Request, RequestMethod, Headers, Response, URLSearchParams, Jsonp, RequestOptions } from "@angular/http";
import { Params } from "@angular/router";

// THIRD PARTY
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import "rxjs/add/operator/delay";

// BUYSELLAPP
import { HttpErrorHandlerService } from "./http-error-handler.service";
import { Listing } from "./entities/listing.model";
import { Bid } from "./entities/bid.model";
import { Review } from "./entities/review.model";
import { Tag } from "./entities/tag.model";
import { User } from "./entities/user.model";

export const REST_URL = new OpaqueToken("rest_url");

@Injectable()
export class RestDataSource {

    constructor(private http: Http,
        private errorHandler: HttpErrorHandlerService,

        @Inject(REST_URL)
        private url: string) { }

    getListings(): Observable<Listing[]> {
        let result: Observable<Listing[]> = this.sendRequest(RequestMethod.Get,
            `${this.url}/Listing`, null);
        return result;
    }

    // getBidsByEmail(email: string): Observable<Bid[]> {

    //     // let result: Observable<Bid[]> = this.sendRequest(RequestMethod.Get,
    //     //     `${this.url}/Bid/GetTempBids`, null);
    //     // return result;
    // }

    getListingsByEmail(email: string): Observable<Listing[]> {
        let result: Observable<Listing[]> = this.sendRequest(RequestMethod.Post,
            `${this.url}/Listing/GetListingsByEmail`, email);

        return result;
    }


    // LISTING
    getListing(listingId: number): Observable<Listing> {
        let result: Observable<Listing> = this.sendRequest(RequestMethod.Get,
            `${this.url}/Listing/${listingId}`);
        return result;
    }

    saveListing(listing: Listing, isExisting: boolean): Observable<Listing> {
        console.log(listing);

        let result: Observable<Listing> = this.sendRequest(isExisting ? RequestMethod.Put : RequestMethod.Post,
            `${this.url}/Listing`, listing);
        return result;
    }

    deleteListing(listingId: number): Observable<Listing> {
        let result: Observable<Listing> = this.sendRequest(RequestMethod.Delete,
            `${this.url}/Listing`, listingId);
        return result;
    }

    uploadImageForListing(image: File, listing: Listing): Observable<void> {
        if (image && listing) {

            let formData = new FormData();
            let headers = new Headers();
            let options = new RequestOptions({ headers: headers });
            formData.append("image", image, image.name);

            let url = `${this.url}/Listing/UploadImageForListingId/${listing.Id}`;

            return this.http.post(url, formData, { headers: headers })
                .map(response => (response != null) ? response.json() : response)
                .catch((error: any) => Observable.throw(error));

        }
    }

    // BID 

    // Using POST since email cannot be used in a GET-request (cause of the @-sign), therefore
    // easier to post an entire Bid object instead
    getBid(email: string, amount: number, listingId: number): Observable<Bid> {
        let tempHolder: Bid = new Bid();
        tempHolder.Email = email;
        tempHolder.Amount = amount;
        tempHolder.ListingId = listingId;

        let result: Observable<Bid> = this.sendRequest(RequestMethod.Post,
            `${this.url}/Bid`, tempHolder);
        return result;
    }

    saveBid(bid: Bid, isExisting: boolean): Observable<Bid> {

        console.log("save", bid, isExisting);

        let result: Observable<Bid> = this.sendRequest(isExisting ? RequestMethod.Put : RequestMethod.Post,
            `${this.url}/Bid`, bid);
        return result;
    }

    // TAG
    getTag(tagId: string): Observable<Tag> {
        let result: Observable<Tag> = this.sendRequest(RequestMethod.Get,
            `${this.url}/Tag`, tagId);
        return result;
    }

    saveTag(tag: Tag, isExisting: boolean): Observable<Tag> {
        let result: Observable<Tag> = this.sendRequest(isExisting ? RequestMethod.Put : RequestMethod.Post,
            `${this.url}/Tag`, tag);
        return result;
    }

    deleteTag(tagId: string): Observable<Tag> {
        let result: Observable<Tag> = this.sendRequest(RequestMethod.Delete,
            `${this.url}/Tag`, tagId);
        return result;
    }

    // REVIEW
    getReview(reviewId: number): Observable<Review> {
        let result: Observable<Review> = this.sendRequest(RequestMethod.Get,
            `${this.url}/Review`, reviewId);
        return result;
    }

    saveReview(review: Review, isExisting: boolean): Observable<Review> {
        let result: Observable<Review> = this.sendRequest(isExisting ? RequestMethod.Put : RequestMethod.Post,
            `${this.url}/Review`, review);
        return result;
    }

    deleteReview(reviewId: Review): Observable<Review> {
        let result: Observable<Review> = this.sendRequest(RequestMethod.Delete,
            `${this.url}/Review`, reviewId);
        return result;
    }
    // USER
    signUpUser(user: User): Observable<void> {
        let result: Observable<void> = this.sendRequest(RequestMethod.Post,
            `${this.url}/User`, user);
        return result;
    }

    getUser(email: string): Observable<User> {
        let result: Observable<User> = this.sendRequest(RequestMethod.Post,
            `${this.url}/User/GetUserByEmail`, email);
        return result;
    }
    saveUser(user: User, isExisting: boolean): Observable<User> {
        let result: Observable<User> = this.sendRequest(isExisting ? RequestMethod.Put : RequestMethod.Post,
            `${this.url}/User`, user);
        return result;
    }

    isUserLoginOK(email: string, password: string): Observable<boolean> {
        let result: Observable<boolean> = this.sendRequest(RequestMethod.Post,
            `${this.url}/User/IsUserLoginOK/${password}`, email);
        return result;
    }

	/**
	 * 
	 * @param verb The HTTP verb, Get, Put, Post, Delete
	 * @param url The URL to perform the operation on, such as `${this.url}/ControllerName/ControllerAction/${param0}/${param1}`
	 * @param body Optional - if sending a body, such as when Put and Post
	 * @param authHttp Default true - if authHttp should be used. Use false for this value for things that needs to be fetched
	 * 								  without an access token, such as in mapview since the end users should not need a token to
	 * 								  just view the maps
	 */
    private sendRequest(verb: RequestMethod,
        url: string,
        body?: Object): Observable<any> {

        let bodyString, headers;
        if (body) {
            bodyString = JSON.stringify(body);
            headers = new Headers({ "Content-Type": "application/json", "Accept": "application/json" });
        }

        console.log(`sendRequest @ds: ${url}`, bodyString, RequestMethod[verb]);

        // TODO mindre kod, finns nog en mer generisk

        switch (verb) {
            case RequestMethod.Get:
                return this.http.get(url, { headers: headers })
                    .map(response => (response != null) ? response.json() : null)
                    .catch((error: any) => this.errorHandler.handleError(error));

            case RequestMethod.Put:
                return this.http.put(url, bodyString, { headers: headers })
                    .map(response => (response != null) ? response.json() : null)
                    .catch((error: any) => this.errorHandler.handleError(error));

            case RequestMethod.Post:
                return this.http.post(url, bodyString, { headers: headers })
                    .map(response => (response != null) ? response.json() : null)
                    .catch((error: any) => this.errorHandler.handleError(error));

            case RequestMethod.Delete:
                return this.http.delete(url, { headers: headers })
                    .map(response => (response != null) ? response.json() : null)
                    .catch((error: any) => this.errorHandler.handleError(error));
        }
    }
}