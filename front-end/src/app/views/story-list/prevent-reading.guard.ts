import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/models/user';
import { StoriesService } from 'src/app/services/stories.service';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PreventReadingGuard implements CanActivate {
  storyid: number;
  chapid: number;
  userid = -1;
  status: boolean;

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private storiesService: StoriesService
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.check();
  }

  check(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.storyid = this.router.getCurrentNavigation().extras.state.storyid;
    this.chapid = this.router.getCurrentNavigation().extras.state.chapid;

    // neu chua  dang nhap thi chuyen den login
    if (this.cookieService.get('userInfo') !== '') {
      this.userid = JSON.parse(this.cookieService.get('userInfo')).id;
    } else {
      this.router.navigate(['login']);
      return false;
    }

    return this.storiesService.checkUserStory(
      {
        userid: this.userid,
        storyid: this.storyid,
        chapid: this.chapid
      }
    ).pipe(map((res) => {
      console.log('errcode: ' + JSON.stringify(res));
      if (res.errorCode === 0) {
        return true;
      } else {
        this.router.navigate(['story-payment'], { state: { storyid: this.storyid, chapid: this.chapid } });
        return false;
      }
    }));
  }

}

// this.storiesService.checkUserStory(
//   {
//     userid: this.user.id,
//     storyid: this.storyid
//   }
// ).subscribe(res => {
//   if (res.errorCode === 0) {
//     this.status = true;
//     return this.status;
//   }
// })


// this.storiesService.checkUserStory(
//   {
//     userid: this.userid,
//     storyid: this.storyid,
//     chapid: this.chapid
//   }
// ).pipe(map((res) => {
//   console.log('errcode: ' + JSON.stringify(res));
//   if (res.errorCode === 0) {
//     return true;
//   } else {
//     return false;
//   }
// }));