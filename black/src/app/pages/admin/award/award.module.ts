import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';
import { AwardService } from 'src/app/services/admin/award.service';
import { SharedAdminModule } from 'src/app/shared/shared-admin.module';
import { AwardListComponent } from './award-list/award-list.component';
import { AwardRoutingModule } from './award.routing';
import { AwardComponent } from './award/award.component';

@NgModule({
  imports: [
    SharedAdminModule,
    AwardRoutingModule,
    NgxMaskModule.forRoot()
  ],
  declarations: [
    AwardComponent,
    AwardListComponent
  ],
  providers: [
    AwardService
  ]
})
export class AwardModule { }
