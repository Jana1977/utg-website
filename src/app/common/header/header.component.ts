import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showFiller = false;
  sideMenu: boolean = false;
  constructor(@Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
  }
  openMenu() {
    if(this.sideMenu) {
      this.sideMenu = false;
      this.document.body.classList.remove('scroll-fixed');
    }else {
      this.sideMenu = true;
      this.document.body.classList.add('scroll-fixed');
    }
  }
  hideMenu() {
    this.sideMenu = false;
  }

}
