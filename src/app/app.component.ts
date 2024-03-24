import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CreateComponent } from './pages/create/create.component';
import { CommonService } from './services/common.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'doubleQuotes';

  isSideBarActive = 'home';
  isDark = false;
  
  sideMenu = [
    {name: 'home', icon:'bi-house'}, 
    {name:'search', icon:'bi-search'}, 
    {name:'create', icon:'bi-plus-square'}, 
    {name:'notification', icon:'bi-envelope'}, 
    {name:'profile', icon:'bi-person-square'}
  ]

  constructor(private common : CommonService){

  }

  onThemeChange(){
    this.isDark = !this.isDark
    if (document.documentElement.getAttribute('data-bs-theme') == 'dark') {
      document.documentElement.setAttribute('data-bs-theme','light')
    }
    else {
        document.documentElement.setAttribute('data-bs-theme','dark')
    }

    this.common.theme.next(this.isDark ? 'dark' : 'light')
  }
}
