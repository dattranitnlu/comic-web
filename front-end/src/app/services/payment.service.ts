import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/internal/Observable';
import { Page } from '../models/page';
import { RootObj } from '../models/root-obj';
import { Payment } from '../models/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private apiService: ApiService) { }

  // get all
  list(): Observable<RootObj<[Payment]>> {
    return this.apiService.get<RootObj<[Payment]>>(`${this.apiService.apiUrl.payment.home}`);
  }

  save(data: Payment): Observable<RootObj<Payment>> {
    if (data.id === 0 || data.id == null) {
      return this.apiService.post<RootObj<Payment>>(this.apiService.apiUrl.payment.home, data);
    } else {
      return this.apiService.put<RootObj<Payment>>(`${this.apiService.apiUrl.payment.home}/${data.id}`, data);
    }
  }

  setStatus(data: Payment): Observable<RootObj<Payment>> {
    return this.apiService.put<RootObj<Payment>>(`${this.apiService.apiUrl.payment.setStatus}/${data.id}`, data);
  }
}
