import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RootObj } from '../models/root-obj';
import { TransactionHistory } from '../models/transaction-history';
import { Page } from '../models/page';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionHistoryService {

  constructor(private apiService: ApiService) { }

  list(sellerId: number, page: Page): Observable<RootObj<[TransactionHistory]>> {
    const queryString = `p=${page.pageNumber}&s=${page.pageSize}`;
    // tslint:disable-next-line: max-line-length
    return this.apiService.get<RootObj<[TransactionHistory]>>(`${this.apiService.apiUrl.transactionHistory.home}/${sellerId}?${queryString}`);
  }
}
