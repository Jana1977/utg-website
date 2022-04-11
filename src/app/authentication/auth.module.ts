import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { SubscriptionComponent } from '../utg/subscriptions-plan/subscription/subscription.component';
import { CancelSubscrptionComponent } from '../utg/subscriptions-plan/cancel-subscrption/cancel-subscrption.component';
import { SwitchPlanComponent } from '../utg/subscriptions-plan/switch-plan/switch-plan.component';
import { AdsSubscriptionComponent } from '../utg/ads-plan/ads-subscription/ads-subscription.component';
@NgModule({
  declarations: [
    LoginComponent,
    SubscriptionComponent,
    CancelSubscrptionComponent,
    SwitchPlanComponent,
    AdsSubscriptionComponent
  ],
  entryComponents: [
  ],
  imports: [
    CommonModule,
    AuthRoutingModule, 
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
  ],
  providers: [MaterialModule]
})
export class AuthModule { }