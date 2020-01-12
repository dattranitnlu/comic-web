import { Injectable } from '@angular/core';
import { StoriesChapter } from '../models/stories-chapter';
import { RootObj } from '../models/root-obj';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Page } from '../models/page';

@Injectable({
  providedIn: 'root'
})
export class StoryChaptersService {

  constructor(private apiService: ApiService) { }

  list(): Observable<RootObj<[StoriesChapter]>> {
    return this.apiService.get<RootObj<[StoriesChapter]>>(this.apiService.apiUrl.chapters.home);
  }
  // get(id): Observable<RootObj<Story>> {
  //   return this.apiService.get<RootObj<Story>>(`${this.apiService.apiUrl.stories.home}/${id}`);
  // }
  listByStoryId(id, page: Page): Observable<RootObj<[StoriesChapter]>> {
    const queryString = `p=${page.pageNumber}&s=${page.pageSize}`;
    return this.apiService.get<RootObj<[StoriesChapter]>>(`${this.apiService.apiUrl.chapters.listByStoryId}/${id}?${queryString}`);
  }

  get(id): Observable<RootObj<StoriesChapter>> {
    return this.apiService.get<RootObj<StoriesChapter>>(`${this.apiService.apiUrl.chapters.home}/${id}`);
  }

  delete(id): Observable<RootObj<StoriesChapter>> {
    return this.apiService.delete<RootObj<StoriesChapter>>(`${this.apiService.apiUrl.chapters.home}/${id}`);
  }

  save(data: StoriesChapter): Observable<RootObj<StoriesChapter>> {
    if (data.id === 0) {
      return this.apiService.post<RootObj<StoriesChapter>>(this.apiService.apiUrl.chapters.home, data);
    } else {
      return this.apiService.put<RootObj<StoriesChapter>>(`${this.apiService.apiUrl.chapters.home}/${data.id}`, data);
    }
  }
  // get(id): Observable<RootObj<StoriesChapter>> {
  //   return this.apiService.get<RootObj<StoriesChapter>>(`${this.apiService.apiUrl.chapters.home}/${id}`);
  // }
  // listByStoryId(id): Observable<RootObj<[StoriesChapter]>> {
  //   return this.apiService.get<RootObj<[StoriesChapter]>>(`${this.apiService.apiUrl.chapters.listByStoryId}/${id}`);
  // }
  buyChapter(data: object): Observable<RootObj<object>> {
    console.log(this.apiService.apiUrl.chapters.buy);
    
    return this.apiService.post<RootObj<object>>(`${this.apiService.apiUrl.chapters.buy}`, data);
  }
  }
