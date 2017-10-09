declare var ENV;

// ANGULAR
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

// THIRD PARTY
import "rxjs/add/operator/filter";
import * as auth0 from "auth0-js";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";

// APP
import { RedirectorService, Route } from "../redirector.service";
import { User } from "../model/entities/user.model";
import { Model } from "../model/repository.model";

@Injectable()
export class AuthService {

	userProfileSubject = new Subject<any>();
	userProfile: any;
	userModel: User;
	
	requestedScopes: string = "openid profile email sub id";

	auth0 = new auth0.WebAuth({
        clientID: "rC3c1QXUL5DdnvbYAH1rk0VB52qPNleI",
        domain: "infc20.eu.auth0.com",
        responseType: "token id_token",
	    redirectUri: ENV == "development" ? "http://localhost:3000/auth" : "",
		audience: 'https://infc20.eu.auth0.com/userinfo',
	    scope: this.requestedScopes,
	});

	constructor(private redirector: RedirectorService,
		private router: Router,
		private model: Model) {}

	public login(): void {
		this.auth0.authorize({});
	}

	public handleAuthentication(): void {
		this.auth0.parseHash((err, authResult) => {
			if (authResult && authResult.accessToken && authResult.idToken) {
				window.location.hash = "";
				this.setSession(authResult);
				location.replace("/");
			} else if (err) {
				console.log("err", err);
			}
		});
	}

	private setSession(authResult): void {
		// Set the time that the access token will expire at
		const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
		localStorage.setItem("access_token", authResult.accessToken);
		localStorage.setItem("id_token", authResult.idToken);
		localStorage.setItem("expires_at", expiresAt);

		console.log("setting session", authResult);
		
	}

	public logout(): void {
		// Removes tokens and expiry time from localStorage
		localStorage.removeItem("access_token");
	    localStorage.removeItem("id_token");
	    localStorage.removeItem("expires_at");

	    this.redirector.redirectTo(Route.AUTH);
	}

	public isAuthenticated(): boolean {
		// Check whether the current time is past the
		// access token"s expiry time
		const expiresAt = JSON.parse(localStorage.getItem("expires_at"));
		return new Date().getTime() < expiresAt;
	}


	public getProfile(cb: (err, profile) => void): void {
		const accessToken = localStorage.getItem("access_token");
		if (!accessToken) {
			throw new Error("Access token must exist to fetch profile");
		}

		if (this.userProfile) {
			if (cb) {
				cb(null, this.userProfile);
			}
			return;
		}

		const self = this;
		this.auth0.client.userInfo(accessToken, (err, profile) => {
			if (profile) {
				self.userProfile = profile;
			}
			cb(err, profile);
		});
	}

	get isAdmin(): boolean {
        // TODO
        return true;
	}



	public getUserId(userIdSubject: Subject<any>) {

		this.getProfile((err, profile) => {
			if (err) {
				console.error(err);
			} else {
				userIdSubject.next(profile.sub);
			}

		});

	}
}