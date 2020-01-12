import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminActionRoutingModule } from './admin-action-routing.module';
import { AdminActionComponent } from './admin-action/admin-action.component';
import { AdminPaymentManagermentComponent } from './admin-payment-managerment/admin-payment-managerment.component';
import { AdminTransactionManagermentComponent } from './admin-transaction-managerment/admin-transaction-managerment.component';
import { 
	IgxButtonModule,
	IgxIconModule,
	IgxLayoutModule,
	IgxNavigationDrawerModule,
	IgxRadioModule,
	IgxRippleModule,
	IgxSwitchModule,
	IgxToggleModule
 } from "igniteui-angular";

@NgModule({
  declarations: [AdminActionComponent, AdminPaymentManagermentComponent, AdminTransactionManagermentComponent],
  imports: [
    CommonModule,
    AdminActionRoutingModule,
    IgxButtonModule,
    IgxIconModule,
    IgxLayoutModule,
    IgxNavigationDrawerModule,
    IgxRadioModule,
    IgxRippleModule,
    IgxSwitchModule,
    IgxToggleModule
  ]
})
export class AdminActionModule { }
