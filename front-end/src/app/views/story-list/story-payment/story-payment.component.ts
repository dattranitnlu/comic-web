import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChapterContentService } from 'src/app/services/chapter-content.service';
import { StoriesService } from 'src/app/services/stories.service';
import { Story } from 'src/app/models/story';
import { ChapterContent } from 'src/app/models/chapter-content';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/models/user';
import { StoryChaptersService } from 'src/app/services/story-chapters.service';
import { StoriesChapter } from 'src/app/models/stories-chapter';
import { PnotifyService } from 'src/app/utils/pnotify.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-story-payment',
  templateUrl: './story-payment.component.html',
  styleUrls: ['./story-payment.component.css']
})
export class StoryPaymentComponent implements OnInit {
  storyid: number;
  chapid: number;
  story: Story;
  chapter: StoriesChapter;
  chapContent: ChapterContent;
  user: User;

  constructor(
    private router: Router,
    private userService: UserService,
    private cookieService: CookieService,
    private storiesService: StoriesService,
    private storyChaptersService: StoryChaptersService,
    private chapterContentService: ChapterContentService,
    private pnotifyService: PnotifyService
  ) {
    this.storyid = Number(this.router.getCurrentNavigation().extras.state.storyid);
    this.chapid = Number(this.router.getCurrentNavigation().extras.state.chapid);
  }

  ngOnInit() {

    // làm việc với bảng user và purchasedChapter

    if (this.cookieService.get('userInfo') !== '') {
      const userid = JSON.parse(this.cookieService.get('userInfo')).id;
      this.userService.get(userid).subscribe(res => {
        this.user = res.data;
      });
    }

    this.storiesService.get(this.storyid).subscribe(res => {
      this.story = res.data;
    });

    this.storyChaptersService.get(this.chapid).subscribe(res => {
      this.chapter = res.data;
    });
  }

  buy() {
    const data = {
      buyerid: this.user.id,
      sellerid: this.story.user.id,
      chapid: this.chapter.id,
      chapCoin: this.chapter.coin
    };
    this.storyChaptersService.buyChapter(data).subscribe(res => {
      if (res.errorCode === 0) {
        this.pnotifyService.success('Info', 'Mua thành công');
        this.router.navigate(['stories', this.story.id]);
      } else {
        this.pnotifyService.error('Info', 'Mua thất bại');
      }
    });
  }

}
