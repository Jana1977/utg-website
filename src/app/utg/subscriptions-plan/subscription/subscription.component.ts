import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { LoaderService } from 'src/app/service/loader.service';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {

  loader: boolean = false;
  priceID: any;
  priceids: any = [];
  isPriceIdPresent: boolean = false;
  primaryAccount: any;
  bankaccounts: any = [];
  successMessage: boolean = false;
  selectedPrice: any;
  subscriptions: any;
  changedPlan: any;
  constructor(private activatedRoute: ActivatedRoute, private loginService: LoginService, private loaderService: LoaderService, private _snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
    this.loginService.getlistSubscriptions().subscribe(res => {
      if(res["data"].length > 0){
      this.subscriptions = res['data'][0];
      this.selectedPrice = res["data"][0]["plan"]["id"]
      }
    })
    if (localStorage.getItem("accessToken")) {
      this.loader = true;
      this.activatedRoute.queryParams.subscribe(params => {
        this.priceID = params.id;
      })
      
      console.log(this.priceID)
      this.selectedPrice = this.priceID
      // this.isPriceIdPresent = this.priceID != "undefined" ? true : false;
      console.log(this.isPriceIdPresent)
      this.loginService.getStripeProductsPrices().subscribe(res => {
        this.priceids = res;
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

  submitSubscription() {
    this.loader = true;
    if (!this.subscriptions) {
      this.loginService.createSubscription(this.primaryAccount, this.selectedPrice).subscribe(res => {
        localStorage.setItem('planID', this.selectedPrice);
        this.loader = false;
        this.successMessage = true;
        setTimeout(() => {
          window.location.reload()
        }, 4000);
        this._snackBar.open(res.message, 'Close', {
          panelClass: "success-message",
          verticalPosition: 'top', // 'top' | 'bottom'
          horizontalPosition: 'center' //'start' | 'center' | 'end' | 'left' | 'right'
        });
        this.isPriceIdPresent = false;
      }, error => {
        this.loader = false;
        this._snackBar.open(error.error.message + '. Please check bank details and try again', 'Close', {
          panelClass: "error-message",
          verticalPosition: 'top', // 'top' | 'bottom'
          horizontalPosition: 'center' //'start' | 'center' | 'end' | 'left' | 'right'
        });
      });
    } else {
      this.loginService.switchPlan(this.priceID, this.priceID).subscribe(res => {
        console.log(res);
        this.loader = false;
        // this.successMessage = true;
        this.isPriceIdPresent = false;
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
  SubmitPrice() {
    let subPlanId = this.subscriptions ? this.subscriptions["plan"]["id"] : null ;
    if ( subPlanId && subPlanId != this.selectedPrice) {
      localStorage.setItem('planID', this.selectedPrice);
      this.router.navigate(["/auth/switch-subscription/" + this.selectedPrice])
    } else if(subPlanId == null && this.selectedPrice){
      this.isPriceIdPresent = true;
    }
    else {
      this.router.navigate(["/auth/cancel-subscription"])
    }

  }
}