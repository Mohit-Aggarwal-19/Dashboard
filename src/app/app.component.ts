import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DummyComponent } from './dummy/dummy.component';
import { NullComponent } from './null/null.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public isMenuOpen: boolean = false;
  public title?: string;

  ngAfterViewInit() {}
  public onSidenavClick(): void {
    this.isMenuOpen = false;
  }
  constructor(private _router: Router) {}

  ngOnInit(): void {
    this.onClickDisplayCharts();
    this.title = 'Welcome to dashboard';
  }

  onClickDisplayTable() {
    console.log('display table works');
    this._router.navigate(['Tables']);
  }

  onClickDisplayCharts() {
    console.log('display charts works');
    this._router.navigate(['Charts']);
  }
  onClickDisplayNotFound() {
    console.log("display Not-Found works");
    this._router.navigate(['Not-Found']);
  }
}
