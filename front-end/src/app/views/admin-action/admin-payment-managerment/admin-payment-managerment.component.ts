import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/services/payment.service';
import { Payment } from 'src/app/models/payment';

@Component({
  selector: 'app-admin-payment-managerment',
  templateUrl: './admin-payment-managerment.component.html',
  styleUrls: ['./admin-payment-managerment.component.css']
})
export class AdminPaymentManagermentComponent implements OnInit {
  payments: [Payment];

  constructor(private paymentService: PaymentService) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.paymentService.list().subscribe(res => {
      this.payments = res.data;
      console.log(JSON.stringify(this.payments));
    });
  }

  check(payid, useridd, usercoin, coinn) {
    // cộng số xu user có với xu mua thêm
    this.paymentService.setStatus({ id: payid, userid: useridd, coin: usercoin + coinn, payStatus: true } as Payment).subscribe(res => {
      this.init();
    });
  }

}
