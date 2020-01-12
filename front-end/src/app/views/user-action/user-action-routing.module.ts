import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppGuard } from 'src/app/app.guard';
import { PaymentInComponent } from './payment-in/payment-in.component';
import { TransactionHistoriesComponent } from './transaction-histories/transaction-histories.component';
import {ForgotComponent} from './forgot/forgot.component';
import { FillCodeComponent } from './fill-code/fill-code.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'user/payment', canActivate: [AppGuard], component: PaymentInComponent },
  { path: 'user/transaction-histories/:userid', canActivate: [AppGuard], component: TransactionHistoriesComponent },
  { path: 'forgot', component: ForgotComponent },
  { path: 'user/fill-code/:email', component: FillCodeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserActionRoutingModule { }
