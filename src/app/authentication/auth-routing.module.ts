import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { AdsSubscriptionComponent } from '../utg/ads-plan/ads-subscription/ads-subscription.component';
import { CancelSubscrptionComponent } from '../utg/subscriptions-plan/cancel-subscrption/cancel-subscrption.component';
import { SubscriptionComponent } from '../utg/subscriptions-plan/subscription/subscription.component';
import { SwitchPlanComponent } from '../utg/subscriptions-plan/switch-plan/switch-plan.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'subscription',
    children: [{
      path: "",
      component: SubscriptionComponent
    }, {
      path: ":id",
      component: SubscriptionComponent
    }]

  },
  {
    path: 'cancel-subscription',
    component: CancelSubscrptionComponent
  },
  {
    path: 'switch-subscription',
    children:[{
      path: "",
      component: SwitchPlanComponent
    }, {
      path: ":id",
      component: SwitchPlanComponent
    }]
  },
  {
    path: 'ads-subscription',
    component: AdsSubscriptionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
