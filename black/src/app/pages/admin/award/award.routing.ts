import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionHelper } from 'src/app/helpers/permission.helper';
import { AuthGuard } from 'src/app/services/auth/auth.guard';
import { ApplicationListComponent } from './application-list/application-list.component';
import { ApplicationComponent } from './application/application.component';
import { AwardListComponent } from './award-list/award-list.component';
import { AwardComponent } from './award/award.component';
import { GiftListComponent } from './gift-list/gift-list.component';
import { GiftComponent } from './gift/gift.component';
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
      },
      {
        path: 'app',
        canActivate: [AuthGuard],
        data: { permission: PermissionHelper.APP_VIEW },
        component: ApplicationListComponent
      },
      {
        path: 'app/novo',
        canActivate: [AuthGuard],
        data: { permission: PermissionHelper.APP_ADD },
        component:  ApplicationComponent
      },
      {
        path: 'app/:id',
        canActivate: [AuthGuard],
        data: { permission: PermissionHelper.APP_ADD },
        component:  ApplicationComponent
      },
      {
        path: 'brinde',
        canActivate: [AuthGuard],
        data: { permission: PermissionHelper.APP_VIEW },
        component: GiftListComponent
      },
      {
        path: 'brinde/novo',
        canActivate: [AuthGuard],
        data: { permission: PermissionHelper.APP_ADD },
        component:  GiftComponent
      },
      {
        path: 'brinde/:id',
        canActivate: [AuthGuard],
        data: { permission: PermissionHelper.APP_ADD },
        component:  GiftComponent
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
