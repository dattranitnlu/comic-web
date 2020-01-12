// import { Page } from './../models/page';
// import { ApiService } from './api.service';
// import { Customer } from './../models/customer';
// import { Observable } from 'rxjs';
// import { Injectable } from '@angular/core';
// import { RootObj } from '../models/root-obj';

// @Injectable({
//   providedIn: 'root'
// })
// export class CustomerService {

//   constructor(private apiService: ApiService) { }
//   list(page: Page): Observable<RootObj<[Customer]>> {
//     const queryString = `p=${page.pageNumber}&s=${page.pageSize}`;
//     return this.apiService.get<RootObj<[Customer]>>
//       (`${this.apiService.apiUrl.customers.home}?${queryString}`);
//   }
//   listByCustomerType(id: number, page: Page): Observable<RootObj<[Customer]>> {
//     const queryString = `p=${page.pageNumber}&s=${page.pageSize}`;
//     return this.apiService.get<RootObj<[Customer]>>
//       (`${this.apiService.apiUrl.customers.listByType}/${id}?${queryString}`);
//   }
//   get(id): Observable<RootObj<Customer>> {
//     return this.apiService.get<RootObj<Customer>>(`${this.apiService.apiUrl.customers.home}/${id}`);
//   }

//   save(data: Customer): Observable<RootObj<Customer>> {
//     if (data.id === 0) {
//       return this.apiService.post<RootObj<Customer>>(this.apiService.apiUrl.customers.home, data);
//     } else {
//       return this.apiService.put<RootObj<Customer>>(`${this.apiService.apiUrl.customers.home}/${data.id}`, data);
//     }
//   }
//   delete(id: number): Observable<RootObj<Customer>> {
//     return this.apiService.delete<RootObj<Customer>>(`${this.apiService.apiUrl.customers.home}/${id}`);
//   }
// }
