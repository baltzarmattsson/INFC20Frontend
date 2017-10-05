declare var ENV;

import { NgModule } from "@angular/core";
import { HttpModule, JsonpModule } from "@angular/http"
import { Model } from "./repository.model";
import { RestDataSource, REST_URL } from "./rest.datasource";

@NgModule({
    imports: [HttpModule, JsonpModule],
    providers: [Model, RestDataSource,
        { 
            provide: REST_URL, 
            useValue: ENV == "development" ? "http://localhost:52419/api" : "azureurl" ,
        },

    ]

})
export class ModelModule { }