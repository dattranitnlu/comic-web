import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserStoryComponent } from './user-story/user-story.component';
import { UserStoryChaptersComponent } from './user-story-chapters/user-story-chapters.component';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { StoryUploadRoutingModule } from './story-upload-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppInterceptor } from 'src/app/app.interceptor';
import { CookieService } from 'ngx-cookie-service';
import { AppGuard } from 'src/app/app.guard';
import {FileUploadModule} from 'ng2-file-upload/file-upload/file-upload.module';


@NgModule({
  declarations: [UserStoryComponent, UserStoryChaptersComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoryUploadRoutingModule,
    NgxDatatableModule,
    ModalModule.forRoot(),
    CKEditorModule,
    FileUploadModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true
    },
    CookieService,
    AppGuard
  ],
})
export class StoryUploadModule { }
