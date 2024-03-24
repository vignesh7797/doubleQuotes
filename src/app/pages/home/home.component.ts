import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  sideMenu = [
    {name: 'home', icon:'bi-house'}, 
    {name:'search', icon:'bi-search'}, 
    {name:'create', icon:'bi-plus-square'}, 
    {name:'notification', icon:'bi-envelope'}, 
    {name:'profile', icon:'bi-person-square'}
  ]
posts:any = []

  constructor(private http : HttpClient) {
    this.http.get('https://jsonplaceholder.typicode.com/photos').subscribe((res:any) =>{
      this.posts = res.slice(0, 25);
    })
  }
}
