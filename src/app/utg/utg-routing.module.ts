import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { LoginComponent } from '../authentication/login/login.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { DonationComponent } from './donation/donation.component';
import { FeaturesComponent } from './features/features.component';
import { HomeComponent } from './home/home.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsAndConditionComponent } from './terms-and-condition/terms-and-condition.component';

const routes: Routes = [
  {
  path: '',
  component: HomeComponent
},{
  path: 'home',
  component: HomeComponent
},
{
  path: 'about-us',
  component: AboutUsComponent
},
{
  path: 'contact-us',
  component: ContactUsComponent
}
,
{
  path: 'terms-and-condition',
  component: TermsAndConditionComponent
}
,
{
  path: 'privacy-policy',
  component: PrivacyPolicyComponent
},
{
  path: 'donation',
  component: DonationComponent
},
{
  path: 'features',
  component: FeaturesComponent
},
// {
//   path: 'subscription',
//   component: SubscriptionComponent
// },
{
  path: '**',
  component: HomeComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UtgRoutingModule { }
