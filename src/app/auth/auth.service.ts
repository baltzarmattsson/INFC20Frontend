declare var ENV;

// ANGULAR
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

// THIRD PARTY
import "rxjs/add/operator/filter";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";

// APP
import { RedirectorService, Route } from "../redirector.service";
import { User } from "../model/entities/user.model";
import { Model } from "../model/repository.model";

@Injectable()
export class AuthService {

	userModel: User;

	constructor(private redirector: RedirectorService,
		private router: Router,
		private model: Model) {}

	public login(email: string, password: string) {
		this.setSession({ email: email, password: password });
	}


	private setSession(authResult: { email: string, password: string } ): void {
		// Set the time that the access token will expire at
		const expiresAt = JSON.stringify((5000 * 1000) + new Date().getTime());

		localStorage.setItem("logged_in_email", authResult.email);
		localStorage.setItem("logged_in_password", authResult.password);
		localStorage.setItem("expires_at", expiresAt);
	}

	public logout(): void {
		// Removes tokens and expiry time from localStorage		
		localStorage.removeItem("logged_in_email");
		localStorage.removeItem("logged_in_password");
		localStorage.removeItem("expires_at");

	    this.redirector.redirectTo(Route.AUTH);
	}

	public isAuthenticated(): boolean {
		// Check whether the current time is past the
		// access token"s expiry time
		const expiresAt = JSON.parse(localStorage.getItem("expires_at"));
		return new Date().getTime() < expiresAt;
	}

	get isAdmin(): boolean {
        // TODO
        return true;
	}

	public getUserEmail() {
		return localStorage.getItem("logged_in_email");
	}
}