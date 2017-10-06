import { Component,	OnInit } from '@angular/core';
import { Model } from "../model/repository.model";
import { Observable } from "rxjs/Observable";

@Component({
  /**
   * The selector is what angular internally uses
   * for `document.querySelectorAll(selector)` in our index.html
   * where, in this case, selector is the string 'home'.
   */
	selector: 'home',
	styleUrls: ['./home.component.css'],
	templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

	private listings: any[] = [];

	constructor(private model: Model) { }
	
	public ngOnInit() {
		this.model.getListings().subscribe(listings => {
			(<any>Object).assign(this.listings, listings);
			console.log(listings);
			
		});


	}
}
