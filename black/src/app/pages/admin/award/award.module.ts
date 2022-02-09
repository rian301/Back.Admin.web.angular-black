import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';
import { AwardService } from 'src/app/services/admin/award.service';
import { SharedAdminModule } from 'src/app/shared/shared-admin.module';
import { AwardListComponent } from './award-list/award-list.component';
import { AwardRoutingModule } from './award.routing';
import { AwardComponent } from './award/award.component';
import { SentListComponent } from './sent-list/sent-list.component';
import { SentComponent } from './sent/sent.component';

@NgModule({
  imports: [
    SharedAdminModule,
    AwardRoutingModule,
    NgxMaskModule.forRoot()
  ],
  declarations: [
    AwardComponent,
    AwardListComponent,
    SentComponent,
    SentListComponent
  ],
  providers: [
    AwardService
  ]
})
export class AwardModule { }
