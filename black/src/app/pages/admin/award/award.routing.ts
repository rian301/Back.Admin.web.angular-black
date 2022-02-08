import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionHelper } from 'src/app/helpers/permission.helper';
import { AuthGuard } from 'src/app/services/auth/auth.guard';
import { AwardListComponent } from './award-list/award-list.component';
import { AwardComponent } from './award/award.component';

export const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    data: { permission: PermissionHelper.AWARD_VIEW },
    component: AwardListComponent
  },
  {
    path: 'novo',
    canActivate: [AuthGuard],
    data: { permission: PermissionHelper.AWARD_ADD },
    component: AwardComponent
  },
  {
    path: ':id',
    canActivate: [AuthGuard],
    data: { permission: PermissionHelper.AWARD_ADD },
    component: AwardComponent
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
