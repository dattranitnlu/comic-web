import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminActionComponent } from './admin-action/admin-action.component';
import { AppGuard } from 'src/app/app.guard';
import { AdminPaymentManagermentComponent } from './admin-payment-managerment/admin-payment-managerment.component';
import { AdminTransactionManagermentComponent } from './admin-transaction-managerment/admin-transaction-managerment.component';


const routes: Routes = [
  {
    path: 'admin', component: AdminActionComponent, canActivate: [AppGuard],
    children: [
      { path: '', component: AdminPaymentManagermentComponent},
      { path: 'payment-managerment', component: AdminPaymentManagermentComponent},
      { path: 'transaction-managerment', component: AdminTransactionManagermentComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminActionRoutingModule { }
