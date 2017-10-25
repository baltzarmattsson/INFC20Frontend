import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { NoContentComponent } from "./no-content";
import { DetailedListingComponent } from "./detailed-listing/detailed-listing.component";
import { ListingFormComponent } from "./forms/listing-form/listing-form.component";
import { ProfileComponent } from "./profile/profile.component";
import { MyBidsComponent } from "./my-bids/my-bids.component";
import { AuthComponent } from "./auth/auth.component";

import { PendingChangesGuard } from "./forms/form-utils/pending-changes.guard";

export const ROUTES: Routes = [
  { path: "", component: HomeComponent },
  { path: "home", component: HomeComponent },
  { path: "listing/view/:listingid", component: DetailedListingComponent, canDeactivate: [ PendingChangesGuard ] },
  { path: "listing/:mode/:listingid", component: ListingFormComponent, canDeactivate: [ PendingChangesGuard ] },
  { path: "listing/:mode", component: ListingFormComponent, canDeactivate: [ PendingChangesGuard ] },
  { path: "profile", component: ProfileComponent },
  { path: "mybids", component: MyBidsComponent },
  { path: "auth", component: AuthComponent },
  { path: "**", component: NoContentComponent },
];
