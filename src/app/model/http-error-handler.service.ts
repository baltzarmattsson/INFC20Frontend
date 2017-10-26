import { Http, Request, RequestOptions, RequestOptionsArgs, Response, XHRBackend } from "@angular/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs/Rx"
import { Subject } from "rxjs/Subject";

// operators
import "rxjs/add/operator/catch"
import "rxjs/add/observable/throw"
import "rxjs/add/operator/map"

@Injectable()
export class HttpErrorHandlerService {

    public onErrorSubject = new Subject<string>();

    public handleError = (error: any) => {

        let bodyParsed: { Message: string } = JSON.parse(error._body);
        this.onErrorSubject.next(bodyParsed.Message);
        
        return Observable.throw(error)
    }
}