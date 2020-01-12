import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoryListComponent } from './story-list/story-list.component';
import { StoryDetailComponent } from './story-detail/story-detail.component';
import { StoryContentComponent } from './story-content/story-content.component';
import { PreventReadingGuard } from './prevent-reading.guard';
import { StoryPaymentComponent } from './story-payment/story-payment.component';


const routes: Routes = [
  { path: 'stories', component: StoryListComponent },
  { path: 'stories/:id', component: StoryDetailComponent },
  { path: 'stories/:id/:chapId', component: StoryContentComponent, canActivate: [PreventReadingGuard] },
  { path: 'stories/:id/:chapId/:userId', component: StoryContentComponent },
  { path: 'story-payment', component: StoryPaymentComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoryListRoutingModule { }
