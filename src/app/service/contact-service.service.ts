import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactServiceService {

  constructor(private http: HttpClient) { }
  contactFormSubmit(data: any): Observable<any> {
    return this.http.post("https://uturngreen.ml/auth/contactUs", data)
  }
  donationService(data: any): Observable<any> {
    return this.http.post("https://uturngreen.ml//payment/makeDonation", data)
  }
}
