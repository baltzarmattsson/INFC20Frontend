import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { NoContentComponent } from "./no-content";
import { DetailedListingComponent } from "./detailed-listing/detailed-listing.component";
import { ListingFormComponent } from "./listing-form/listing-form.component";
import { ProfileComponent } from "./profile/profile.component";
import { MyBidsComponent } from "./my-bids/my-bids.component";

export const ROUTES: Routes = [
  { path: "",      component: HomeComponent },
  { path: "home",  component: HomeComponent },
  { path: "listing/view/:listingid", component: DetailedListingComponent }, 
  { path: "listing/:mode/:listingid", component: ListingFormComponent }, 
  { path: "listing/:mode", component: ListingFormComponent }, 
  { path: "profile", component: ProfileComponent },
  { path: "mybids", component: MyBidsComponent },
  { path: "**",    component: NoContentComponent },
];
