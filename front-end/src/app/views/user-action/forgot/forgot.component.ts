import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {
  email = '';
  loading = false;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  getCode() {
    this.loading = true;
    this.userService.getCode({ email: this.email }).subscribe(res => {
      console.log(res);
      this.loading = false;
      this.router.navigate(['user/fill-code', this.email]);
    }, err => {
      console.log(err);
      this.loading = false;
    }
    );
  }

}
