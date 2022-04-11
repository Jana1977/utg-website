import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/service/loader.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-switch-plan',
  templateUrl: './switch-plan.component.html',
  styleUrls: ['./switch-plan.component.scss']
})
export class SwitchPlanComponent implements OnInit {

  loader: boolean = false;
  priceID: any;
  subscription_ID: any;
  subscribedID: any;
  priceids: any = [];
  primaryAccount: any;
  bankaccounts: any = [];
  successMessage: boolean = false;
  subscriptionDetails: any;
  constructor(private loginService: LoginService, private loaderService: LoaderService, private _snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
    this.loader = true;
    if (localStorage.getItem("accessToken")) {
      this.priceID = localStorage.getItem('planID');
      this.loginService.getStripeProductsPrices().subscribe(res => {
        this.priceids = res;
        this.loader = false;
      });
      this.loginService.getlistSubscriptions().subscribe(res => {
        this.loader = false;
        this.subscriptionDetails = res["data"][0]
        this.subscription_ID = res["data"];
        for (let index = 0; index < this.subscription_ID.length; index++) {
          this.subscribedID = this.subscription_ID[index].id;
        }
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


  switchPlan() {
    this.loader = true;
    this.loginService.switchPlan(this.subscribedID, this.priceID).subscribe(res => {
      console.log(res);
      this.loader = false;
      this._snackBar.open(res.message, 'Close', {
        panelClass: "success-message",
        verticalPosition: 'top', // 'top' | 'bottom'
        horizontalPosition: 'center' //'start' | 'center' | 'end' | 'left' | 'right'
      });
     this.router.navigate(["/auth/subscription"])
      // });
    }, error => {
      this.loader = false;
      this._snackBar.open(error.error.message, 'Close', {
        panelClass: "error-message",
        verticalPosition: 'top', // 'top' | 'bottom'
        horizontalPosition: 'center' //'start' | 'center' | 'end' | 'left' | 'right'
      });
    });
  }
}