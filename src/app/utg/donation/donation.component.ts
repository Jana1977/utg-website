import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ContactServiceService } from 'src/app/service/contact-service.service';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.scss']
})
export class DonationComponent implements OnInit {
  donationForm: FormGroup;
  billing_address: any;
  selected: string;
  loader: boolean = false;
  countries = [
    { value: 'usa', text: 'United States of America' }
  ];
  months = [
    { value: '01', text: '01' },
    { value: '02', text: '02' },
    { value: '03', text: '03' },
    { value: '04', text: '04' },
    { value: '05', text: '05' },
    { value: '06', text: '06' },
    { value: '07', text: '07' },
    { value: '08', text: '08' },
    { value: '09', text: '09' },
    { value: '10', text: '10' },
    { value: '11', text: '11' },
    { value: '12', text: '12' },
  ];
  states = [
    { value: 'Alabama', text: 'Alabama' },
    { value: 'Alaska', text: 'Alaska' },
    { value: 'Arizona', text: 'Arizona' },
    { value: 'Arkansas', text: 'Arkansas' },
    { value: 'California', text: 'California' },
    { value: 'Connecticut', text: 'Connecticut' },
    { value: 'Delaware', text: 'Delaware' },
    { value: 'Hawaii', text: 'Hawaii' },
    { value: 'Idaho', text: 'Idaho' },
    { value: 'Illinois', text: 'Illinois' },
    { value: 'Iowa', text: 'Iowa' },
    { value: 'Kansas', text: 'Kansas' },
    { value: 'Kentucky', text: 'Kentucky' },
    { value: 'Louisiana', text: 'Louisiana' },
    { value: 'Maine', text: 'Maine' },
    { value: 'Maryland', text: 'Maryland' },
    { value: 'Massachusetts', text: 'Massachusetts' },
    { value: 'Michigan', text: 'Michigan' },
    { value: 'Minnesota', text: 'Minnesota' },
    { value: 'Mississippi', text: 'Mississippi' },
    { value: 'Missouri', text: 'Missouri' },
    { value: 'Montana', text: 'Montana' },
    { value: 'Nebraska', text: 'Nebraska' },
    { value: 'Nevada', text: 'Nevada' },
    { value: 'New Hampshire', text: 'New Hampshire' },
    { value: 'New Jersey', text: 'New Jersey' },
    { value: 'New Mexico', text: 'New Mexico' },
    { value: 'New York', text: 'New York' },
    { value: 'North Carolina', text: 'North Carolina' },
    { value: 'North Dakota', text: 'North Dakota' },
    { value: 'Ohio', text: 'Ohio' },
    { value: 'Oklahoma', text: 'Oklahoma' },
    { value: 'Oregon', text: 'Oregon' },
    { value: 'Pennsylvania', text: 'Pennsylvania' },
    { value: 'Rhode Island', text: 'Rhode Island' },
    { value: 'South Carolina', text: 'South Carolina' },
    { value: 'Tennessee', text: 'Tennessee' },
    { value: 'Texas', text: 'Texas' },
    { value: 'Utah', text: 'Utah' },
    { value: 'Vermont', text: 'Vermont' },
    { value: 'Virginia', text: 'Virginia' },
    { value: 'Washington', text: 'Washington' },
    { value: 'West Virginia', text: 'West Virginia' },
    { value: 'Wisconsin', text: 'Wisconsin' },
    { value: 'Wyoming', text: 'Wyoming' },
  ];
  successMessage: boolean;
  constructor(private formBuilder: FormBuilder, private contactService: ContactServiceService, private _snackBar: MatSnackBar) {
    this.donationForm = this.formBuilder.group({
      // amount: ["", Validators.required],
      selected_amount: ["", Validators.required],
      custom_amount: [""],
      amount: ["", Validators.required],
      // custom_amount: [""],
      first_name: ["", Validators.required],
      last_name: ["", Validators.required],
      phone: [""],
      email: ["", Validators.compose([Validators.required, Validators.email])],
      donor_addr_line1: [""],
      donor_addr_line2: [""],
      donor_city: [""],
      donor_state: [""],
      donor_zip_code: [""],
      donor_province: [""],
      donor_country: [""],
      card_holder_name: ["", Validators.required],
      card_number: ["", Validators.compose([Validators.required, Validators.pattern('(?!0+$)[0-9]{0,16}'), Validators.minLength(15), Validators.maxLength(16)])],
      exp_month: ["", Validators.required],
      exp_year: ["", Validators.required],
      cvc: ["", Validators.compose([Validators.required, Validators.pattern('(?!0+$)[0-9]{0,4}'), Validators.minLength(3), Validators.maxLength(4)])],
      billing_addr_line1: [""],
      billing_addr_line2: [""],
      billing_city: [""],
      billing_state: [""],
      billing_zip_code: [""],
      billing_province: [""],
      billing_country: [""],
    })
    // this.donationForm.get("selected_amount").valueChanges.subscribe(res => {
    //   console.log(res, res == "00", "adhjsajhasdhjasdjh")
    //   if (res == "00") {
    //     this.donationForm.get("custom_amount").setValidators(Validators.required);
    //   } else {
    //     this.donationForm.get("custom_amount").clearAsyncValidators();
    //   }
    //   this.donationForm.get("custom_amount").updateValueAndValidity();
    // })
  }

  ngOnInit() {
  }
  otherAmountChange() {
    // console.log(this.donationForm.get("amount").value)
    if (this.donationForm.get("selected_amount").value == "00") {
      this.donationForm.controls["custom_amount"].setValidators(Validators.required);
      this.donationForm.controls["custom_amount"].updateValueAndValidity();
    } else {
      this.donationForm.controls["custom_amount"].clearValidators();
      this.donationForm.controls["custom_amount"].updateValueAndValidity();
    }
  }

  onSubmit() {
    this.loader = true;
    if (this.donationForm.get("selected_amount").value == "00") {
      if (this.donationForm.get("custom_amount").value) {
        this.donationForm.patchValue({
          amount: this.donationForm.get("custom_amount").value
        })
      }
    } else {
      this.donationForm.patchValue({
        amount: this.donationForm.get("selected_amount").value
      })
    }
    if (this.donationForm.invalid) {
      this._snackBar.open('Please complete all mandatory fields and re-submit your request ', 'Close', {
        panelClass: "error-message",
        verticalPosition: 'top', // 'top' | 'bottom'
        horizontalPosition: 'center' //'start' | 'center' | 'end' | 'left' | 'right'
      });
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
      setTimeout(() => {
        this.loader = false;
      }, 2000);
      return
    }
    if (this.donationForm.get("amount").value == "00") {
      if (this.donationForm.get("custom_amount").value) {
        this.donationForm.patchValue({
          amount: this.donationForm.get("custom_amount").value
        })
      }
    }
    let formData = new FormData();
    Object.keys(this.donationForm.value).map(key => {
      // console.log(key, "---------")
      // if ("donor_information" == key || "billing_address" == key) {
      //   Object.keys(this.donationForm.get(key).value).map(key1 => {
      //     formData.append('[' + key + '][' + key1 + ']', this.donationForm.get(key).value[key1])
      //   })
      // } else {
      formData.append(String(key), this.donationForm.value[key])
      // }
    })
    this.contactService.donationService(formData).subscribe(res => {
      this.loader = false;
      this.successMessage = true;
      // this._snackBar.open(res.message, 'Close', {
      //   panelClass: "success-message",
      //   verticalPosition: 'top', // 'top' | 'bottom'
      //   horizontalPosition: 'center' //'start' | 'center' | 'end' | 'left' | 'right'
      // });
    }, error => {
      this.loader = false
      this._snackBar.open(error.error.message + '. Please check your card detail', 'Close', {
        panelClass: "error-message",
        verticalPosition: 'top', // 'top' | 'bottom'
        horizontalPosition: 'center' //'start' | 'center' | 'end' | 'left' | 'right'
      });
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    })
  }
  fillAutoAddress(event) {
    if (event.checked) {
      this.donationForm.get("billing_addr_line1").patchValue(this.donationForm.get("donor_addr_line1").value)
      this.donationForm.get("billing_addr_line2").patchValue(this.donationForm.get("donor_addr_line2").value)
      this.donationForm.get("billing_city").patchValue(this.donationForm.get("donor_city").value)
      this.donationForm.get("billing_state").patchValue(this.donationForm.get("donor_state").value)
      this.donationForm.get("billing_zip_code").patchValue(this.donationForm.get("donor_zip_code").value)
      this.donationForm.get("billing_province").patchValue(this.donationForm.get("donor_province").value)
      this.donationForm.get("billing_country").patchValue(this.donationForm.get("donor_country").value)
    } else {
      this.donationForm.patchValue({
        billing_addr_line1: "",
        billing_addr_line2: "",
        billing_city: "",
        billing_state: "",
        billing_zip_code: "",
        billing_province: "",
        billing_country: "",
      })
    }
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  goBack() {
    window.location.reload()
  }
}
