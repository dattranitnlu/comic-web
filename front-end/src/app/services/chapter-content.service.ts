import { Injectable } from '@angular/core';
import { RootObj } from '../models/root-obj';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { ChapterContent } from '../models/chapter-content';

@Injectable({
  providedIn: 'root'
})
export class ChapterContentService {

  constructor(private apiService: ApiService) { }

  get(id): Observable<RootObj<ChapterContent>> {
    return this.apiService.get<RootObj<ChapterContent>>(`${this.apiService.apiUrl.chapterContent.home}/${id}`);
  }
}
