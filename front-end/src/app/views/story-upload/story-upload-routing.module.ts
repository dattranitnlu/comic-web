import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserStoryComponent } from './user-story/user-story.component';
import { UserStoryChaptersComponent } from './user-story-chapters/user-story-chapters.component';
import { AppGuard } from 'src/app/app.guard';


const routes: Routes = [
  {
    path: 'list/:id',
    canActivate: [AppGuard],
    component: UserStoryComponent
  },
  {
    path: 'user-stories/:id',
    canActivate: [AppGuard],
    component: UserStoryChaptersComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoryUploadRoutingModule { }
