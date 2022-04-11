import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ErrorComponent } from 'src/app/common/dialog/components/error/error.component';
import { SuccessComponent } from 'src/app/common/dialog/components/success/success.component';
import { ContactServiceService } from 'src/app/service/contact-service.service';
import { LoaderService } from 'src/app/service/loader.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  contactForm: FormGroup;
  loader: boolean = false;
  durationInSeconds = 5;
  constructor(private formBuilder: FormBuilder, private contactService: ContactServiceService, private _snackBar: MatSnackBar, private loaderService: LoaderService) {
    this.contactForm = this.formBuilder.group({
      full_name: ["", Validators.required],
      email: ["", Validators.compose([Validators.required, Validators.email])],
      phone: ["", Validators.required],
      subject: [""],
      message: [""]
    });
  }
  ngOnInit() {
  }

  onSubmit() {
    this.loader = true;
    if (this.contactForm.invalid) {
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
    this.contactService.contactFormSubmit(this.contactForm.value).subscribe(res => {
      // alert(res.message)    
      this.loader = false
      this._snackBar.open(res.message + ' UTG Admin will contact you ASAP!', 'Close', {
        panelClass: "success-message",
        verticalPosition: 'top', // 'top' | 'bottom'
        horizontalPosition: 'center' //'start' | 'center' | 'end' | 'left' | 'right'
      });
      setTimeout(() => {
        window.location.reload()
      }, 4000);
    }, error => {
      this.loader = false;
      alert(error.message.message)
    })
  }
}
