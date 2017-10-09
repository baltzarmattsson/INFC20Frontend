// ANGULAR
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { NgModule,  ApplicationRef} from "@angular/core";
import { removeNgStyles, createNewHosts, createInputTransfer } from "@angularclass/hmr";
import { RouterModule, PreloadAllModules} from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CdkTableModule } from '@angular/cdk/table';

// ANGULAR - MATERIAL
import { MatInputModule, MatButtonModule } from "@angular/material";

// APP
import { ENV_PROVIDERS } from "./environment";
import { ROUTES } from "./app.routes";

// APP - MODULES
import { ModelModule } from "./model/model.module";

// APP - COMPONENTS
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { DetailedListingComponent } from "./detailed-listing/detailed-listing.component";
import { HomeComponent } from "./home/home.component";
import { NoContentComponent } from "./no-content";
import { ListingFormComponent } from "./listing-form/listing-form.component";
import { ProfileComponent } from "./profile/profile.component";
import { MyBidsComponent } from "./my-bids/my-bids.component";
import { AuthComponent } from "./auth/auth.component";

// APP - SERVICES
import { RedirectorService } from "./redirector.service";
import { AuthService } from "./auth/auth.service";

import "../styles/reset.css";
import "../styles/styles.scss";
import "../styles/headings.css";
import "../styles/material-icons-rules.css";

// Application wide providers
const APP_PROVIDERS = [
];

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    HeaderComponent,
    DetailedListingComponent,
    HomeComponent,
    NoContentComponent,
    ListingFormComponent,
    ProfileComponent,
    MyBidsComponent,
    AuthComponent
  ],

  imports: [
    ReactiveFormsModule,
    ModelModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    CdkTableModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, {
      useHash: Boolean(history.pushState) === false,
      preloadingStrategy: PreloadAllModules
    })
  ],

  providers: [
    ENV_PROVIDERS,
    APP_PROVIDERS,
    RedirectorService,
    FormBuilder,
    AuthService
  ],

  exports: [
    ReactiveFormsModule
  ]
})
export class AppModule {

  constructor(
    public appRef: ApplicationRef
  ) {}

}
