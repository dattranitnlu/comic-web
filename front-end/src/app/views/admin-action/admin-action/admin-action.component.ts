import { Component, OnInit, ViewChild } from '@angular/core';
import { IgxNavigationDrawerComponent } from "igniteui-angular";


@Component({
  selector: 'app-admin-action',
  templateUrl: './admin-action.component.html',
  styleUrls: ['./admin-action.component.css']
})
export class AdminActionComponent implements OnInit {
  @ViewChild(IgxNavigationDrawerComponent, { static: true })
  public drawer: IgxNavigationDrawerComponent;
  public drawerState = {
    miniTemplate: false,
    open: true,
    pin: true
  };
  constructor() { }
  // public navigate(item) {
  //   if (!this.drawer.pin) {
  //     this.drawer.close();
  //   }
  // }
  ngOnInit() {
  }

}
