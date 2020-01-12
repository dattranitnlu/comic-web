import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-fill-code',
  templateUrl: './fill-code.component.html',
  styleUrls: ['./fill-code.component.css']
})
export class FillCodeComponent implements OnInit {

  email = '';
  code = '';
  notify = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
  ) {
    this.email = this.route.snapshot.paramMap.get('email');
  }

  ngOnInit() {

  }

  getNewPassword() {
    this.userService.getNewPassword({
      email: this.email,
      code: this.code
    }).subscribe(res => {
      this.notify = 'Mật khẩu đã được gửi trong email. Vui lòng kiểm tra.';
    }, err => {
      this.notify = 'Sai mã code';
    });
  }

}
