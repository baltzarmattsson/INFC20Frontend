import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Params } from "@angular/router";
import "rxjs/Rx";

import { Listing } from "./entities/listing.model";
import { Bid } from "./entities/bid.model";
import { Review } from "./entities/review.model";
import { Tag } from "./entities/tag.model";
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


    // LISTING
    getListing(listingId: number): Observable<Listing> {
        let result: Observable<Listing> = this.dataSource.getListing(listingId);
        return result;
    }

    addListing(listing: Listing): Observable<Listing> {
        let result: Observable<Listing> = this.dataSource.addListing(listing);
        return result;
    }

    updateListing(listing: Listing): Observable<Listing> {
        let result: Observable<Listing> = this.dataSource.updateListing(listing);
        return result;
    }

    deleteListing(listing: number): Observable<Listing> {
        let result: Observable<Listing> = this.dataSource.deleteListing(listing);
        return result;
    }

    // BID 
    getBid(email: string, amount: number, listingId: number): Observable<Bid> {
        let result: Observable<Bid> = this.dataSource.getBid(email, amount, listingId);
        return result;
    }

    addBid(bid: Bid): Observable<Bid> {
        let result: Observable<Bid> = this.dataSource.addBid(bid);
        return result;
    }

    updateBid(bid: Bid): Observable<Bid> {
        let result: Observable<Bid> = this.dataSource.updateBid(bid);
        return result;
    }


    // TAG
    getTag(tag: string): Observable<Tag> {
        let result: Observable<Tag> = this.dataSource.getTag(tag);
        return result;
    }

    addTag(tag: Tag): Observable<Tag> {
        let result: Observable<Tag> = this.dataSource.addTag(tag);
        return result;
    }

    updateTag(tag: Tag): Observable<Tag> {
        let result: Observable<Tag> = this.dataSource.updateTag(tag);
        return result;
    }

    deleteTag(tagId: string): Observable<Tag> {
        let result: Observable<Tag> = this.dataSource.deleteTag(tagId);
        return result;
    }

    // REVIEW
    getReview(reviewId: number): Observable<Review> {
        let result: Observable<Review> = this.dataSource.getReview(reviewId);
        return result;
    }

    addReview(review: Review): Observable<Review> {
        let result: Observable<Review> = this.dataSource.addReview(review);
        return result;
    }

    updateReview(review: Review): Observable<Review> {
        let result: Observable<Review> = this.dataSource.updateReview(review);
        return result;
    }

    deleteReview(reviewId: Review): Observable<Review> {
        let result: Observable<Review> = this.dataSource.deleteReview(reviewId);
        return result;
    }

}