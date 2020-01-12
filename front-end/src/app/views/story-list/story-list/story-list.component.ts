import { Component, OnInit } from '@angular/core';
import { Story } from 'src/app/models/story';
import { StoriesService } from 'src/app/services/stories.service';
import { log } from 'util';

@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.css']
})
export class StoryListComponent implements OnInit {
  stories: [Story];
  topStories: Story[] = new Array(3);
  top1: Story;
  top2: Story;
  top3: Story;
  top4: Story;
  top5: Story;
  show: boolean;
  p: number = 1;
  constructor(private storiesService: StoriesService) { }

  ngOnInit() {
    this.loadStories();
    this.show = true;
  }

  loadStories() {
    this.storiesService.list2().subscribe(res => {
      this.stories = res.data;
      this.topStories = this.stories.slice(0,5);
      this.top1 = this.topStories[0];
      this.top2 = this.topStories[1];
      this.top3 = this.topStories[2];
      this.top4 = this.topStories[3];
      this.top5 = this.topStories[4];

    });
  }
  close(){
    this.show = false;
  }

}
