import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionHelper } from 'src/app/helpers/permission.helper';
import { AuthGuard } from 'src/app/services/auth/auth.guard';
import { AwardListComponent } from './award-list/award-list.component';
import { AwardComponent } from './award/award.component';
import { SentListComponent } from './sent-list/sent-list.component';
import { SentComponent } from './sent/sent.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'premios',
        pathMatch: 'full'
      },
      {
        path: 'premios',
        canActivate: [AuthGuard],
        data: { permission: PermissionHelper.AWARD_VIEW },
        component: AwardListComponent
      },
      {
        path: 'premio/novo',
        canActivate: [AuthGuard],
        data: { permission: PermissionHelper.AWARD_ADD },
        component: AwardComponent
      },
      {
        path: 'premio/:id',
        canActivate: [AuthGuard],
        data: { permission: PermissionHelper.AWARD_ADD },
        component: AwardComponent
      },
      {
        path: 'envio',
        canActivate: [AuthGuard],
        data: { permission: PermissionHelper.SENT_VIEW },
        component: SentListComponent
      },
      {
        path: 'envio/novo',
        canActivate: [AuthGuard],
        data: { permission: PermissionHelper.SENT_ADD },
        component:  SentComponent
      },
      {
        path: 'envio/:id',
        canActivate: [AuthGuard],
        data: { permission: PermissionHelper.SENT_ADD },
        component:  SentComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AwardRoutingModule {

}
