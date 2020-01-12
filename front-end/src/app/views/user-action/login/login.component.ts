import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from 'src/app/services/user.service';
import { PnotifyService } from 'src/app/utils/pnotify.service';
import { log } from 'util';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message: string;
  username: string;
  password: string;
  userName: string;

  constructor(private userService: UserService,
    // tslint:disable-next-line:align
    private authService: AuthService,
    // tslint:disable-next-line:align
    private cookieService: CookieService,
    // tslint:disable-next-line:align
    private pnNofity: PnotifyService,
    private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.userService.login(this.username, this.password).subscribe(res => {
      console.log('-----------'+res);
      
      if (res.errorCode === 0) {
        this.message = '';
        // save user info, then redirect to dashboard
        this.cookieService.set('userInfo', JSON.stringify(res.data));
        this.cookieService.set('username', res.data.username);
        this.cookieService.set('password', this.password);
        this.cookieService.set('userID', res.data.id.toString());
        this.cookieService.set('token', res.data.token);
        this.userName = this.cookieService.get('userInfo');
        console.log(this.userName);
        this.authService.setLoggedIn(true);
        this.router.navigate(['/stories']).then(() => {
          window.location.reload();
        });
      }
    }, err => {
      this.pnNofity.error('Login', 'Tên đăng nhập hoặc mật khẩu');
    });
  }

}
