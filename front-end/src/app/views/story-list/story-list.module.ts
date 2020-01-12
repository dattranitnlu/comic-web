import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

import { StoryListRoutingModule } from './story-list-routing.module';
import { StoryListComponent } from './story-list/story-list.component';
import { StoryDetailComponent } from './story-detail/story-detail.component';
import { StoryContentComponent } from './story-content/story-content.component';
import { PreventCopyDirective } from './story-content/prevent-copy.directive';
import { StoryPaymentComponent } from './story-payment/story-payment.component';


@NgModule({
  declarations: [
    StoryListComponent,
    StoryDetailComponent,
    StoryContentComponent,
    PreventCopyDirective,
    StoryPaymentComponent
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    StoryListRoutingModule,
  ]
})
export class StoryListModule { }
