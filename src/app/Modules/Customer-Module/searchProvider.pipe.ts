import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name:'searchProvider'
})
//check whether input text(search text) includes in supplier names
export class SearchProviderPipe implements PipeTransform{
    transform(provider:any[],searchText:string):any[]{
        if(!provider) return [];
        if(!searchText) return provider;

        searchText = searchText.toUpperCase();
        return provider.filter(provider=>{
            if(provider.user_name.toUpperCase().includes(searchText)) return provider;
        })
    }
}