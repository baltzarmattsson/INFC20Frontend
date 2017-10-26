import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Params } from "@angular/router";
import "rxjs/Rx";

import { Listing } from "./entities/listing.model";
import { Bid } from "./entities/bid.model";
import { Review } from "./entities/review.model";
import { Tag } from "./entities/tag.model";
import { User } from "./entities/user.model";
import { RestDataSource } from "./rest.datasource";

@Injectable()
export class Model {

    constructor(private dataSource: RestDataSource) {
    }

    getListings(): Observable<Listing[]> {
        return this.dataSource.getListings();
    }

    // getBidsByEmail(email: string): Observable<Bid[]> {
    //     return this.dataSource.getBidsByEmail(email);
    // }

    getListingsByEmail(email: string): Observable<Listing[]> {
        return this.dataSource.getListingsByEmail(email);
    }


    // LISTING
    getListing(listingId: number): Observable<Listing> {
        let result: Observable<Listing> = this.dataSource.getListing(listingId);
        return result;
    }

    saveListing(listing: Listing, isExisting: boolean): Observable<Listing> {
        return this.dataSource.saveListing(listing, isExisting);
    }

    deleteListing(listing: number): Observable<Listing> {
        let result: Observable<Listing> = this.dataSource.deleteListing(listing);
        return result;
    }

    uploadImageForListing(image: File, listing: Listing): Observable<void> {
        let result: Observable<void> = this.dataSource.uploadImageForListing(image, listing);
        return result;
    }

    // BID 
    getBid(email: string, amount: number, listingId: number): Observable<Bid> {
        let result: Observable<Bid> = this.dataSource.getBid(email, amount, listingId);
        return result;
    }

    saveBid(bid: Bid, isExisting: boolean): Observable<Bid> {
        return this.dataSource.saveBid(bid, isExisting);
    }


    // TAG
    getTag(tag: string): Observable<Tag> {
        let result: Observable<Tag> = this.dataSource.getTag(tag);
        return result;
    }

    
    saveTag(tag: Tag, isExisting: boolean): Observable<Tag> {
        return this.dataSource.saveTag(tag, isExisting);
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
    
    saveReview(review: Review, isExisting: boolean): Observable<Review> {
        return this.dataSource.saveReview(review, isExisting);
    }

    deleteReview(reviewId: Review): Observable<Review> {
        let result: Observable<Review> = this.dataSource.deleteReview(reviewId);
        return result;
    }

    // USER
    signUpUser(user: User): Observable<void> {
        return this.dataSource.signUpUser(user);
    }

    getUser(email: string): Observable<User> {
        return this.dataSource.getUser(email);
    }    
    
    saveUser(user: User, isExisting: boolean): Observable<User> {
        return this.dataSource.saveUser(user, isExisting);
    }

    isUserLoginOK(email: string, password: string): Observable<boolean> {
        return this.dataSource.isUserLoginOK(email, password);
    }


}