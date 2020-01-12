import { Component, OnInit } from '@angular/core';
import { Page } from 'src/app/models/page';
import { TransactionHistoryService } from 'src/app/services/transaction-history.service';
import { TransactionHistory } from 'src/app/models/transaction-history';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transaction-histories',
  templateUrl: './transaction-histories.component.html',
  styleUrls: ['./transaction-histories.component.css']
})
export class TransactionHistoriesComponent implements OnInit {
  page: Page = { pageNumber: 0, pageSize: 5 } as Page;
  tranHistories: [TransactionHistory];
  userid: number = Number(this.route.snapshot.paramMap.get('userid'));

  constructor(private transactionHistoryService: TransactionHistoryService, private route: ActivatedRoute, ) { }

  ngOnInit() {
    this.loadStories();
  }

  loadStories(page = null) {
    if (page != null) {
      this.page.pageNumber = page.offset;
    }
    this.transactionHistoryService.list(this.userid, this.page).subscribe(res => {
      this.page = res.pageInfo;
      this.tranHistories = res.data;
      console.log(this.tranHistories);
    });
  }

}
