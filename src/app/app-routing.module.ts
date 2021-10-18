import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { FailedComponent } from './failed/failed.component';
import { LogoutComponent } from './logout/logout.component';
import { MsalGuard } from '@azure/msal-angular';
import { OriginatorGuard } from './shared/originator.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
    import('./subject-shared/subject-shared.module').then(m => m.SubjectSharedModule)
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'login-failed',
    component: FailedComponent
  },
  {
    path: 'subjects',
    data: { preload: true },
    loadChildren: () =>
      import('./subject/subject.module').then(m => m.SubjectModule)
  },
  {
    path: 'subject',
    loadChildren: () =>
    import('./subject-edit/subject-edit.module').then(m => m.SubjectEditModule)
  },
  {
    path: 'strategies',
    data: { preload: false },
    loadChildren: () =>
      import('./strategy/strategy.module').then(m => m.StrategyModule)
  },
  {
    path: 'categories',
    data: { preload: false },
    loadChildren: () =>
      import('./categories/categories.module').then(m => m.CategoriesModule)
  },
  {
    path: 'profile',
    data: { preload: false },
    loadChildren: () =>
      import('./user-data/user-data.module').then(m => m.UserDataModule)
  },
  { path: 'about',  component: AboutComponent },
  { path: 'privacy', component:  PrivacyPolicyComponent},
  { path: 'logout', redirectTo: 'home', pathMatch: 'full' },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];

const isIframe = window !== window.parent && !window.opener;


@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: false,
    // Don't perform initial navigation in iframes
    initialNavigation: !isIframe ? 'enabled' : 'disabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
