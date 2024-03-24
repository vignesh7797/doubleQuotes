import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { SearchComponent } from './pages/search/search.component';
import { CreateComponent } from './pages/create/create.component';
import { NotificationComponent } from './pages/notification/notification.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
    {
        path : '',
        redirectTo : 'home',
        pathMatch:'full'
    },
    {
        path : 'home',
        component : HomeComponent,
    },
    {
        path : 'login',
        component : LoginComponent,
    },
    {
        path:'search',
        component:SearchComponent,
    },
    {
        path:'create',
        component:CreateComponent,
    },
    {
        path:'notification',
        component:NotificationComponent,
    },
    {
        path:'profile',
        component:ProfileComponent,
    }
];
