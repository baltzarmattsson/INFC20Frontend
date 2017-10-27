import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: "filter",
	pure: false
})
export class FilterPipe implements PipeTransform {
    
    transform(items: any[], attributeNames: string[], filter: string): any {
        // console.log("trans", items, filter, attributeNames);
        
        if (!items || !filter) {
			return items;
		}

		let added = false;
		let filtered = [];
		items.forEach(item => {

			if (attributeNames) {
				attributeNames.forEach(attribute => {

					if (!added && item[attribute] != undefined && item[attribute].toString().toUpperCase().indexOf(filter.toUpperCase()) != -1) {
						filtered.push(item);
						added = true;
					} 
				});

			} else if (!attributeNames) {
				if (!added && item.toString().toUpperCase().indexOf(filter.toUpperCase()) != -1) {
					filtered.push(item);
					added = true;
				}
			}

			added = false;
        });
        // console.log(filtered.slice());
        
		return filtered;
    }
}
