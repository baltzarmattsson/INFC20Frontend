import { Bid } from "./bid.model";

export class Listing {
    constructor(public Id?: number,
        public Title?: string,
        public Description?: string,
        public Published?: Date,
        public EndTime?: Date,
        public ImgUrl?: string,
        public MaxBid?: number,
        public Bids?: Bid[],
        public UserEmail?: string) {

    }
}