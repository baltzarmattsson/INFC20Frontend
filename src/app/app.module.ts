// ANGULAR
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule,  ApplicationRef} from '@angular/core';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';
import { RouterModule, PreloadAllModules} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// APP
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';

// APP - MODULES
import { ModelModule } from "./model/model.module"

// APP - COMPONENTS
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NoContentComponent } from './no-content';

import '../styles/styles.scss';
import '../styles/headings.css';

// Application wide providers
const APP_PROVIDERS = [
];

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    HomeComponent,
    NoContentComponent
  ],

  imports: [
    ModelModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, {
      useHash: Boolean(history.pushState) === false,
      preloadingStrategy: PreloadAllModules
    })
  ],

  providers: [
    ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})
export class AppModule {

  constructor(
    public appRef: ApplicationRef
  ) {}

}