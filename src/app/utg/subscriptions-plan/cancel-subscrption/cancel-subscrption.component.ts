import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { MatSnackBar } from '@angular/material';
import { LoaderService } from 'src/app/service/loader.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cancel-subscrption',
  templateUrl: './cancel-subscrption.component.html',
  styleUrls: ['./cancel-subscrption.component.scss']
})
export class CancelSubscrptionComponent implements OnInit {

  loader: boolean = false;
  subscription_ID: any = [];
  priceID: any;
  priceids: any = [];
  primaryAccount: any;
  bankaccounts: any = [];
  subscribedID: any;

  constructor(private loginService: LoginService, private _snackBar: MatSnackBar,  private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem("accessToken")) {
      this.loader = true;
      this.priceID = localStorage.getItem('planID');
      this.loginService.getlistSubscriptions().subscribe(res => {
        this.loader = false;
        this.priceids = res;
        this.subscription_ID = res["data"]
        for (let index = 0; index < this.subscription_ID.length; index++) {
          this.subscribedID = this.subscription_ID[index].id;
          console.log(this.subscribedID);
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

  cancelStripeSubscription() {
    this.loader = true;
    this.loginService.cancelSubscription(this.subscribedID).subscribe(res => {
      this.loader = false;
      console.log(res);
      this._snackBar.open(res["message"] + '', 'Close', {
        panelClass: "success-message",
        verticalPosition: 'top', // 'top' | 'bottom'
        horizontalPosition: 'center' //'start' | 'center' | 'end' | 'left' | 'right'
      });
      this.router.navigate(["/auth/subscription"])
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
