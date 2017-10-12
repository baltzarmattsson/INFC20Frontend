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
import { MatInputModule, MatButtonModule, MatDialogModule } from "@angular/material";

// THIRD PARTY
import { CalendarModule, MessagesModule } from "primeng/primeng";

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
import { ListingViewComponent } from "./listing-view/listing-view.component";
import { ConfirmModalComponent } from "./form-utils/confirm-modal.component";

// APP - SERVICES
import { RedirectorService } from "./redirector.service";
import { AuthService } from "./auth/auth.service";
import { ListingClickNotifierService } from "./listing-view/listing-click-notifier.service";
import { ResponseMessageService } from "./response-message/response-message.service";
import { ConfirmModalService } from "./form-utils/confirm-modal.service";
import { PendingChangesGuard } from "./form-utils/pending-changes.guard";

import "../styles/reset.css";
import "../styles/styles.scss";
import "../styles/headings.css";
import "../styles/material-icons-rules.css";
import "../../node_modules/primeng/resources/themes/omega/theme.css";
import "../../node_modules/primeng/resources/primeng.min.css";

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
    AuthComponent,
    ListingViewComponent,
    ConfirmModalComponent
  ],

  imports: [
    ReactiveFormsModule,
    ModelModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    CdkTableModule,
    CalendarModule,
    MessagesModule,
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
    AuthService,
    ListingClickNotifierService,
    ResponseMessageService,
    ConfirmModalService,
    PendingChangesGuard
  ],

  exports: [
    ReactiveFormsModule
  ],

  entryComponents: [
    ConfirmModalComponent
  ]
})
export class AppModule {

  constructor(
    public appRef: ApplicationRef
  ) {}

}
