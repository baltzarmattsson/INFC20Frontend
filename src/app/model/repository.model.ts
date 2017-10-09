import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Params } from "@angular/router";
import "rxjs/Rx";

import { Listing } from "./entities/listing.model";
import { Bid } from "./entities/bid.model";
import { RestDataSource } from "./rest.datasource";

@Injectable()
export class Model {

	constructor(private dataSource: RestDataSource) {
    }
    
    getListings(): Observable<Listing[]> {
        return this.dataSource.getListings();
    }

    getBidsByEmail(email: string): Observable<Bid[]> {
        return this.dataSource.getBidsByEmail(email);
    }

    getListingsByEmail(email: string): Observable<Listing[]> {
        return this.dataSource.getListingsByEmail(email);
    }

}