import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';
import { MatSnackBar } from '@angular/material';
import { LoaderService } from 'src/app/service/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userName: string;
  loginForm: FormGroup;
  loader: boolean = false;
  accessToken: any;
  moduleName: any;
  category: any;
  planId: any;
  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private _snackBar: MatSnackBar, private activatedRoute: ActivatedRoute, private router: Router, private loaderService: LoaderService) {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.compose([Validators.required, Validators.email])],
      password: ["", Validators.required]
    });
    this.activatedRoute.queryParams.subscribe(params => {
      let userName = params['username'];
      localStorage.setItem('userName', userName);
      this.planId = params['planid'];
      this.moduleName = params['module'];
      localStorage.setItem('module', this.moduleName);
      this.category = params['category'];
      localStorage.setItem('category', this.category);
      this.loginForm.patchValue({
        email: params['username']
      })
    });
  }

  ngOnInit() {
    this.userName = localStorage.getItem('userName');

  }

  login() {
    this.loader = true;
    if (this.loginForm.invalid) {
      this._snackBar.open('Please complete all mandatory fields and re-submit your request ', 'Close', {
        panelClass: "error-message",
        verticalPosition: 'top', // 'top' | 'bottom'
        horizontalPosition: 'center' //'start' | 'center' | 'end' | 'left' | 'right'
      });
      setTimeout(() => {
        this.loader = false;
      }, 2000);
      return
    }
    this.loginService.authLogin(this.loginForm.value.email, this.loginForm.value.password).subscribe(res => {
      // alert(res.message)    
      this.loader = false;
      this._snackBar.open(res.message, 'Close', {
        panelClass: "success-message",
        verticalPosition: 'top', // 'top' | 'bottom'
        horizontalPosition: 'center' //'start' | 'center' | 'end' | 'left' | 'right'
      });
      this.accessToken = res.access_token;
      localStorage.setItem('accessToken', this.accessToken);
      // this.router.navigate(['/auth/subscription']);
      this.moduleName = localStorage.getItem('module');
      // if (this.moduleName == "subscription") {
      this.router.navigate(["/auth/subscription"]);
      // } else if (this.moduleName == "cancelsubscription") {
      //   this.router.navigate(['/auth/cancel-subscription']);
      // } else if (this.moduleName == "switchplan") {
      //   this.router.navigate(['/auth/switch-subscription']);
      // } else {
      //   this.router.navigate(['/auth/ads-subscription']);
      // }
    }, error => {
      this.loader = false;
      alert("Login Failed");
    });
  }

}
