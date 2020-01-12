import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {
  }
  baseUrl = 'http://localhost:3000/';
  apiUrl = {
    users: {
      home: `${this.baseUrl}users`,
      login: `${this.baseUrl}users/login`,
      code: `${this.baseUrl}send/code`,
      newPass: `${this.baseUrl}send/new-password`,
    },
    stories: {
      home: `${this.baseUrl}stories`,
      getStoriesByUserId: `${this.baseUrl}stories/getByUserId`,
      checkUserStory: `${this.baseUrl}stories/user-story`,
    },
    chapters: {
      home: `${this.baseUrl}chapters`,
      listByStoryId: `${this.baseUrl}chapters/getStoryChapters`,
      buy: `${this.baseUrl}chapters/chapter-paying`,
    },
    chapterContent: {
      home: `${this.baseUrl}chapter-content`,
    },
    payment: {
      home: `${this.baseUrl}payment`,
      setStatus: `${this.baseUrl}payment/set-status`,
    },
    transactionHistory: {
      home: `${this.baseUrl}transaction-historys`,
    },
  };

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }
  post<T>(url: string, data): Observable<T> {
    return this.http.post<T>(url, data);
  }
  put<T>(url: string, data): Observable<T> {
    return this.http.put<T>(url, data);
  }
  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(url);
  }
}
