import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { RootObj } from '../models/root-obj';
import { User } from '../models/user';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private apiService: ApiService) { }

    login(userName: string, passWord: string): Observable<RootObj<User>> {
        const data = {
            username: userName,
            password: passWord
        };
        return this.apiService.post<RootObj<User>>(this.apiService.apiUrl.users.login, data);
    }

    get(id): Observable<RootObj<User>> {
        return this.apiService.get<RootObj<User>>(`${this.apiService.apiUrl.users.home}/${id}`);
    }

    post(user: User): Observable<RootObj<User>> {
        return this.apiService.post<RootObj<User>>(this.apiService.apiUrl.users.home, user);
    }

    getCode(email: object): Observable<object> {
        console.log((this.apiService.apiUrl.users.code));
        console.log(JSON.stringify(email));
        return this.apiService.post(this.apiService.apiUrl.users.code, email);
    }

    getNewPassword(body: object): Observable<object> {
        return this.apiService.post(this.apiService.apiUrl.users.newPass, body);
    }

    changePassword(id, data): Observable<RootObj<User>> {
        return this.apiService.put<RootObj<User>>(`${this.apiService.apiUrl.users.home}/${id}`, data);
    }
}
