import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { createClient } from 'pexels';

const client = createClient(
  'vLRlPvKGRuHES2RkbkNPPBCaFCoRfcPRRkOMjanoebhGO4Ove9fEgi37'
);


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  theme = new BehaviorSubject('light');
  getTheme = this.theme.asObservable();
  sources:any=[];
  imgUrl:any;

  url = 'https://pixabay.com/api/?key=42056614-eee8bbb0ab528aac8c9f2d41b&pretty=true'

  constructor(private http:HttpClient) {  
    
   }

  onPagination(page:any){
    this.http.get(this.url+'&page='+page)
  }

  getImages(page:number, search:string){
    // return this.http.get(this.url+'&page='+ page +'&per_page=25&image_type=vector&order=popular&image_type=all&category=backgrounds')
    return client.photos
      .search({
        query: search,
        page: page,
        per_page: 30,
        orientation: 'square', 
      })
  }
  
}
