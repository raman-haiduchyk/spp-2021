import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForbiddenComponent } from './core/components/forbidden/forbidden.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  {
    path: 'main', loadChildren: () => import('./main/main.module').then(m => m.MainModule)
  },
  {
    path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'not-found', component: NotFoundComponent},
  { path: '**', redirectTo: 'not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
