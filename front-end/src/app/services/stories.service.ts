import { Injectable } from '@angular/core';
import { Story } from '../models/story';
import { RootObj } from '../models/root-obj';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Page } from '../models/page';

@Injectable({
  providedIn: 'root'
})
export class StoriesService {

  constructor(private apiService: ApiService) { }

  // get all
  list(page: Page): Observable<RootObj<[Story]>> {
    const queryString = `p=${page.pageNumber}&s=${page.pageSize}`;
    return this.apiService.get<RootObj<[Story]>>(`${this.apiService.apiUrl.stories.home}?${queryString}`);
  }
  // getByType(id, page: Page): Observable<RootObj<[Customer]>> {
  //   const queryString = `p=${page.pageNumber}&s=${page.pageSize}`;
  //   return this.apiService.get<RootObj<[Customer]>>(`${this.apiService.apiUrl.stories.getByType}/${id}?${queryString}`);
  // }
  get(id): Observable<RootObj<Story>> {
    return this.apiService.get<RootObj<Story>>(`${this.apiService.apiUrl.stories.home}/${id}`);
  }
  delete(id): Observable<RootObj<Story>> {
    return this.apiService.delete<RootObj<Story>>(`${this.apiService.apiUrl.stories.home}/${id}`);
  }
  save(data: Story): Observable<RootObj<Story>> {
    if (data.id === 0) {
      return this.apiService.post<RootObj<Story>>(this.apiService.apiUrl.stories.home, data);
    } else {
      return this.apiService.put<RootObj<Story>>(`${this.apiService.apiUrl.stories.home}/${data.id}`, data);
    }
  }
  checkUserStory(data: object): Observable<RootObj<object>> {
    return this.apiService.post<RootObj<object>>(`${this.apiService.apiUrl.stories.checkUserStory}`, data);
  }
  list2(): Observable<RootObj<[Story]>> {
    return this.apiService.get<RootObj<[Story]>>(this.apiService.apiUrl.stories.home);
  }
  getByType(id, page: Page): Observable<RootObj<[Story]>> {
    const queryString = `p=${page.pageNumber}&s=${page.pageSize}`;
    return this.apiService.get<RootObj<[Story]>>(`${this.apiService.apiUrl.stories.getStoriesByUserId}/${id}?${queryString}`);
  }
}
