import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/service/loader.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-ads-subscription',
  templateUrl: './ads-subscription.component.html',
  styleUrls: ['./ads-subscription.component.scss']
})
export class AdsSubscriptionComponent implements OnInit {

  loader: boolean = false;
  priceID: any;
  priceids: any = [];
  primaryAccount: any;
  bankaccounts: any = [];
  successMessage: boolean = false;
  category: any;
  adsPackage: any = [];

  constructor(private loginService: LoginService, private loaderService: LoaderService,private _snackBar: MatSnackBar,  private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem("accessToken")) {
      this.loader = true;
      this.category = localStorage.getItem('category');
      this.priceID = localStorage.getItem('planID');
      this.loginService.getlistAdPackages(this.category).subscribe(res => {
        this.adsPackage = res;
        this.loader = false;
      });
      this.loginService.getBankAccounts().subscribe(res => {
        this.loader = false;
        this.bankaccounts = res;
        this.primaryAccount = res["default_source"];
      });
    }
    else {
      this.router.navigate(['/auth']);
    }
  }

  submitbuyAdpackage() {
    this.loader = true;
    this.loginService.buyAdpackage(this.primaryAccount,this.priceID).subscribe(res => {
      this.loader = false;
      this.successMessage = true;
      // this._snackBar.open(res["message"] + '', 'Close', {
      //   panelClass: "success-message",
      //   verticalPosition: 'top', // 'top' | 'bottom'
      //   horizontalPosition: 'center' //'start' | 'center' | 'end' | 'left' | 'right'
      // });
    }, error => {
      this.loader = false;
      this._snackBar.open(error.error.message + '. Please check bank details and try again', 'Close', {
        panelClass: "error-message",
        verticalPosition: 'top', // 'top' | 'bottom'
        horizontalPosition: 'center' //'start' | 'center' | 'end' | 'left' | 'right'
      });
    });
  }
}
