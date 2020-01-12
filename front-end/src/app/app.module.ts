import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoryListModule } from './views/story-list/story-list.module';
import { StoryUploadModule } from './views/story-upload/story-upload.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { UserActionModule } from './views/user-action/user-action.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppInterceptor } from './app.interceptor';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AppGuard } from './app.guard';
import { AdminActionModule } from './views/admin-action/admin-action.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FileUploadModule } from 'ng2-file-upload/file-upload/file-upload.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { 
	IgxButtonModule,
	IgxIconModule,
	IgxLayoutModule,
	IgxNavigationDrawerModule,
	IgxRadioModule,
	IgxRippleModule,
	IgxSwitchModule,
  IgxToggleModule,
 } from "igniteui-angular";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FileUploadModule,
    AppRoutingModule,
    StoryListModule,
    StoryUploadModule,
    UserActionModule,
    AdminActionModule,
    HttpClientModule,
    NgxDatatableModule,
    MDBBootstrapModule.forRoot(),
    ReactiveFormsModule,
    ModalModule.forRoot(),
    IgxButtonModule,
    IgxIconModule,
    IgxLayoutModule,
    IgxNavigationDrawerModule,
    IgxRadioModule,
    IgxRippleModule,
    IgxSwitchModule,
    IgxToggleModule

    ,
    BrowserAnimationsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AppInterceptor,
    multi: true
  },
    CookieService,
    AppGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
