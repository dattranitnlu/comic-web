import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserActionRoutingModule } from './user-action-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { PaymentInComponent } from './payment-in/payment-in.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { TransactionHistoriesComponent } from './transaction-histories/transaction-histories.component';
import { IgxRadioModule } from "igniteui-angular";
import { ForgotComponent } from './forgot/forgot.component';
import { FillCodeComponent } from './fill-code/fill-code.component';
import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
  declarations: [LoginComponent, PaymentInComponent, TransactionHistoriesComponent, ForgotComponent, FillCodeComponent],
  imports: [
    IgxRadioModule,
    CommonModule,
    FormsModule,
    UserActionRoutingModule,
    NgxPayPalModule,
    NgxLoadingModule
  ]
})
export class UserActionModule { }
