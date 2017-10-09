import { Component } from '@angular/core';
import { AuthService } from "../auth/auth.service";

import { Bid } from "../model/entities/bid.model";
import { Model } from "../model/repository.model";


@Component({
    moduleId: module.id.toString(),
    templateUrl: 'my-bids.component.html',
    styleUrls: ['my-bids.component.scss']
})
export class MyBidsComponent {

    private myBids: Bid[];

    constructor(private auth: AuthService,
        private model: Model) {}

    ngOnInit() {
        if (this.auth.isAuthenticated()) {
            this.model.getBidsByEmail(this.auth.getUserEmail()).subscribe((bids: Bid[]) => {
                console.log(bids, this.auth.getUserEmail());

                this.myBids = bids.filter(bid => bid.Email == this.auth.getUserEmail());
            });
        }
    }

}
