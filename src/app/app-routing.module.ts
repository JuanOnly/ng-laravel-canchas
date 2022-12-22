import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NotFoundComponent } from './pages/notFound404/not-found.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },

  {
    path: 'parameters',
    loadChildren: () => import('./modules/parameters/parameters.module').then(x => x.ParametersModule)
  },

  {
    path: 'security',
    loadChildren: () => import('./modules/security/security.module').then(x => x.SecurityModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(x => x.AuthModule)
  },

  {
    path: 'profile',
    component: ProfileComponent
  },

  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { component: NotFoundComponent, path: "not_found" },
  { path: "**", redirectTo: "not_found" },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AuthRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
