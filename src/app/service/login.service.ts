import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  authLogin(email: string, password: string): Observable<any> {
    let formData: FormData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    return this.http.post("https://uturngreen.ml/auth/login", formData);
  }

  getlistSubscriptions() {
    const headerDict = {
      'Authorization': localStorage.getItem("accessToken")
    }
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http.get("https://uturngreen.ml/payment/listStripeSubscription", requestOptions);
  }

  getStripeProductsPrices() {
    return this.http.get("https://uturngreen.ml/payment/getStripeProductsPrices");
  }

  getBankAccounts() {
    const headerDict = {
      'Authorization': localStorage.getItem("accessToken")
    }
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http.post("https://uturngreen.ml/payment/listStripeBankAccounts", null, requestOptions);
  }

  createSubscription(account_id: string, price_id: string): Observable<any> {
    let formData: FormData = new FormData();
    formData.append('account_id', account_id);
    formData.append('price_id', price_id);
    const headerDict = {
      'Authorization': localStorage.getItem("accessToken")
    }
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http.post("https://uturngreen.ml/payment/createStripeSubscription", formData, requestOptions);
  }

  cancelSubscription(subscription_id : string) {
    let formData: FormData = new FormData();
    formData.append('subscription_id', subscription_id);
    const headerDict = {
      'Authorization': localStorage.getItem("accessToken")
    }
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http.post("https://uturngreen.ml/payment/cancelStripeSubscription", formData, requestOptions);
  }

  switchPlan(subscription_id: string, price_id: string): Observable<any> {
    let formData: FormData = new FormData();
    formData.append('subscription_id', subscription_id);
    formData.append('price_id', price_id);
    const headerDict = {
      'Authorization': localStorage.getItem("accessToken")
    }
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http.post("https://uturngreen.ml/payment/updateStripeSubscription", formData, requestOptions);
  }

  getlistAdPackages(category : string) {
    let formData: FormData = new FormData();
    formData.append('category', category);
    const headerDict = {
      'Authorization': localStorage.getItem("accessToken")
    }
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http.post("https://uturngreen.ml/payment/listAdPackages", formData, requestOptions);
  }

  buyAdpackage(account_id: string, price_id: string): Observable<any> {
    console.log(account_id, price_id, localStorage.getItem("accessToken"));
    let formData: FormData = new FormData();
    formData.append('account_id', account_id);
    formData.append('price_id', price_id);
    const headerDict = {
      'Authorization': localStorage.getItem("accessToken")
    }
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http.post("https://uturngreen.ml/payment/buyAdPackage", formData, requestOptions);
  }

}