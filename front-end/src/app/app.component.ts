import { Component, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal/public_api';
import { User } from './models/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PnotifyService } from './utils/pnotify.service';
import { UserService } from './services/user.service';
import { MustMatch } from './models/MustMatch';
import { ChangePass } from './models/changepass';


@Component({
  selector: 'app-root,ngbd-dropdown-basic',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('registerModal', { static: false }) registerModal: ModalDirective;
  @ViewChild('changePasswordModal', { static: false }) changePasswordModal: ModalDirective;
  title = 'storiesV1U1';
  userName: string;
  userid: string;
  hashedPass: string;
  show: boolean;

  changeP: ChangePass = {} as ChangePass;

  user: User = {} as User;

  registerForm: FormGroup;
  changePasswordForm: FormGroup;
  submitted = false;
  constructor(
    private cookieService: CookieService,
    private authService: AuthService,
    private router: Router,
    private pnotify: PnotifyService,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.registerForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]

    }, {
      validator: MustMatch('password', 'confirmPassword')
    });

    this.changePasswordForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  ngOnInit(): void {
    
    console.log(this.user.coin);
    if (this.authService.isLoggedIn === true) {
      this.userName = this.cookieService.get('username');
      this.userid = this.cookieService.get('userID');
      this.hashedPass = this.cookieService.get('password');
      this.show = true;
   
    }
    this.userService.get(this.userid).subscribe(res =>{
      this.user = res.data;
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  logout(): void {
    this.authService.setLoggedIn(false);
    this.cookieService.deleteAll('/');
    this.show = false;
    this.router.navigate(['/']);
  }

  // modals
  hideModal() {
    this.registerModal.hide();
  }

  // show modal
  openAdd() {
    this.registerModal.show();
  }

  openChangePassword() {
    this.changePasswordModal.show();
  }

  hideChangePassword() {
    this.changePasswordModal.hide();
  }

  save() {
    this.userService.post(this.user).subscribe(res => {
      if (res.errorCode == 0) {
        this.user = {} as User;
        this.pnotify.success('Register', 'Sucessfully!');
      } else {
        this.pnotify.error('Register', 'Failed');
      }
    }, err => {
      this.pnotify.error('Register', err);
    });
    this.hideModal();
  }

  changePassword(f) {
    if (f.oldPassword === this.hashedPass) {
      if (f.newPassword === f.confirmPassword) {
        this.userService.changePassword(this.userid, this.changeP).subscribe(res => {
          if (res.errorCode == 0) {
            this.pnotify.success('Change Password', 'Sucessfully!');
          } else {
            this.pnotify.error('Change Password', 'Failed');
          }
        });
      } else {
        this.pnotify.error('Change Password', 'New and Confirm password is not matched');
      }
    } else {
      this.pnotify.error('Change Password', 'Old password is incorrect');
    }
    this.changeP = {} as ChangePass;
    this.hideChangePassword();
  }

}