import { Bid } from "./bid.model";

export class Listing {
    constructor(public Number?: number,
        public Title?: string,
        public Description?: string,
        public Start_Time?: Date,
        public End_Time?: Date,
        public Picture?: string,
        public MaxBid?: number,
        public Bids?: Bid[],
        public Email?: string) {

    }
}