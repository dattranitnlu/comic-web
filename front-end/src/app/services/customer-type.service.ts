// import { Injectable } from '@angular/core';
// import { CustomerType } from '../models/customer-type';
// import { Observable } from 'rxjs';
// import { ApiService } from './api.service';
// import { RootObj } from '../models/root-obj';

// @Injectable({
//   providedIn: 'root'
// })
// export class CustomerTypeService {

//   constructor(private apiService: ApiService) { }

//   list(): Observable<RootObj<[CustomerType]>> {
//     return this.apiService.get<RootObj<[CustomerType]>>(this.apiService.apiUrl.customerTypes);
//   }
//   get(id): Observable<RootObj<CustomerType>> {
//     return this.apiService.get<RootObj<CustomerType>>(`${this.apiService.apiUrl.customerTypes}/${id}`);
//   }
//   // add(data: CustomerType): Observable<RootObj<CustomerType>> {
//   //   return this.apiService.post<RootObj<CustomerType>>(this.apiService.apiUrl.customerTypes, data);
//   // }
//   // update(data: CustomerType): Observable<RootObj<CustomerType>> {
//   //   return this.apiService.put<RootObj<CustomerType>>(`${this.apiService.apiUrl.customerTypes}/${data.id}`, data);
//   // }
//   save(data: CustomerType): Observable<RootObj<CustomerType>> {
//     if (data.id === 0) {
//       return this.apiService.post<RootObj<CustomerType>>(this.apiService.apiUrl.customerTypes, data);
//     } else {
//       return this.apiService.put<RootObj<CustomerType>>(`${this.apiService.apiUrl.customerTypes}/${data.id}`, data);
//     }
//   }
//   delete(id: number): Observable<RootObj<CustomerType>> {
//     return this.apiService.delete<RootObj<CustomerType>>(`${this.apiService.apiUrl.customerTypes}/${id}`);
//   }
// }
