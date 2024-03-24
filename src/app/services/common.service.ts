import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  theme = new BehaviorSubject('light');
  getTheme = this.theme.asObservable();

  constructor() { }

  
}
