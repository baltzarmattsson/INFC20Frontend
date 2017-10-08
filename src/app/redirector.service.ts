import { Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";

@Injectable()
export class RedirectorService {

    constructor(private activeRoute: ActivatedRoute,
        private router: Router) { }


    public redirectTo(route: Route, primaryEntityId?: any) {

        let url = "";

        switch (route) {
            case Route.HOME:
                url = "";
                break;

            case Route.LISTING_CREATE:
                url = "listing/create";
                break;

            case Route.LISTING_EDIT:
                if (primaryEntityId == undefined)
                    throw "primaryEntityId undefined, listing edit";

                url = `listing/edit/${primaryEntityId}`;
                break;

            case Route.LISTING_VIEW:
                if (!primaryEntityId == undefined)
                    throw "primaryEntityId undefined, listing view";

                url = `listing/view/${primaryEntityId}`;
                break;

            case Route.PROFILE:
                url = "profile";
                break;

            case Route.MY_BIDS:
                url = "mybids";
                break;

            default:
                throw "Unknown Route: " + route;
        }

        this.router.navigate([url]);

    }
}

export enum Route {

    HOME,
    LISTING_CREATE,
    LISTING_EDIT,
    LISTING_VIEW,
    PROFILE,
    MY_BIDS,
}