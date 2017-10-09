// ANGULAR
import { Injectable, Inject, OpaqueToken } from "@angular/core";
import { Http, Request, RequestMethod, Headers, Response, URLSearchParams, Jsonp, RequestOptions } from "@angular/http";
import { Params } from "@angular/router";

// THIRD PARTY
import { AuthHttp } from "angular2-jwt";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import "rxjs/add/operator/delay";

// BUYSELLAPP
import { Listing } from "./entities/listing.model";
import { Bid } from "./entities/bid.model";

export const REST_URL = new OpaqueToken("rest_url");

@Injectable()
export class RestDataSource {

    constructor(private http: Http,
        // private authHttp: AuthHttp,

        @Inject(REST_URL)
        private url: string) { }

	getListings(): Observable<Listing[]> {
        let result: Observable<Listing[]> = this.sendRequest(RequestMethod.Get,
        `${this.url}/Bid/GetTempListings`, null, false);
		return result;
    }
    
    getBidsByEmail(email: string ): Observable<Bid[]> {
        
        let result: Observable<Bid[]> = this.sendRequest(RequestMethod.Get,
            `${this.url}/Bid/GetTempBids`, null, false);
            return result;
    }

    getListingsByEmail(email: string): Observable<Listing[]> {
        return this.getListings();
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
        body?: Object,
        authHttp: boolean = true): Observable<any> {

        let bodyString, headers;
        if (body) {
            bodyString = JSON.stringify(body);
            headers = new Headers({ "Content-Type": "application/json" });
        }

        console.log(`sendRequest @ds: ${url}`, bodyString);

        if (authHttp) {
            switch (verb) {
                case RequestMethod.Get:
                    return this.authHttp.get(url, { headers: headers })
                        .map(response => (response != null) ? response.json() : null)
                        .catch((error: any) => Observable.throw(error));

                case RequestMethod.Put:
                    return this.authHttp.put(url, bodyString, { headers: headers })
                        .map(response => (response != null) ? response.json() : null)
                        .catch((error: any) => Observable.throw(error));

                case RequestMethod.Post:
                    return this.authHttp.post(url, bodyString, { headers: headers })
                        .map(response => (response != null) ? response.json() : null)
                        .catch((error: any) => Observable.throw(error));

                case RequestMethod.Delete:
                    return this.authHttp.delete(url, { headers: headers })
                        .map(response => (response != null) ? response.json() : null)
                        .catch((error: any) => Observable.throw(error));
            }
        }
        // Use regular http
        else if (!authHttp) {
            switch (verb) {
                case RequestMethod.Get:
                    return this.http.get(url, { headers: headers })
                        .map(response => (response != null) ? response.json() : null)
                        .catch((error: any) => Observable.throw(error));

                case RequestMethod.Put:
                    return this.http.put(url, bodyString, { headers: headers })
                        .map(response => (response != null) ? response.json() : null)
                        .catch((error: any) => Observable.throw(error));

                case RequestMethod.Post:
                    return this.http.post(url, bodyString, { headers: headers })
                        .map(response => (response != null) ? response.json() : null)
                        .catch((error: any) => Observable.throw(error));

                case RequestMethod.Delete:
                    return this.http.delete(url, { headers: headers })
                        .map(response => (response != null) ? response.json() : null)
                        .catch((error: any) => Observable.throw(error));
            }
        }
    }
}