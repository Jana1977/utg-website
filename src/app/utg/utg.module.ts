import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../common/header/header.component';
import { FooterComponent } from '../common/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { WelcomeHeaderComponent } from '../common/welcome-header/welcome-header.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { TermsAndConditionComponent } from './terms-and-condition/terms-and-condition.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { DonationComponent } from './donation/donation.component';
import { SharedModule } from '../common/shared.module';
import { UtgRoutingModule } from './utg-routing.module';
import { FeaturesComponent } from './features/features.component';
import { LoaderComponent } from '../loader/loader.component';
import { ErrorComponent } from '../common/dialog/components/error/error.component';
import { SuccessComponent } from '../common/dialog/components/success/success.component';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AdsSubscriptionComponent } from './ads-plan/ads-subscription/ads-subscription.component';
@NgModule({
  declarations: [
    HomeComponent,
    AboutUsComponent,
    ContactUsComponent,
    TermsAndConditionComponent,
    PrivacyPolicyComponent,
    DonationComponent,
    FeaturesComponent,
    ErrorComponent,
    SuccessComponent,
    // AdsSubscriptionComponent,
  ],
  entryComponents: [
  ],
  imports: [
    CommonModule,
    UtgRoutingModule,
    MaterialModule,
    SharedModule,
    FlexLayoutModule
  ],
  providers: []
})
export class UtgModule { }