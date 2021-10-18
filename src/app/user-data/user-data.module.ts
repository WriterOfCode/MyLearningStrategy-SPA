import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserDataComponent } from './user-data.component';
import { MsalGuard } from '@azure/msal-angular';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: UserDataComponent,
        canActivate : [MsalGuard],
      }
     ])
  ],
  declarations: [
    UserDataComponent
  ]
})
export class UserDataModule { }
