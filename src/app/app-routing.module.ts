import { NgModule } from '@angular/core';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material';
import { Routes, RouterModule } from '@angular/router';
import { CommonLayoutComponent } from './layout/common-layout/common-layout.component';
import { FullLayoutComponent } from './layout/full-layout/full-layout.component';


const routes: Routes = [
  {
    path: "auth",
    component: FullLayoutComponent,
    loadChildren: () => import('./authentication/auth.module').then(m => m.AuthModule)
  }, {
    path: "",
    component: CommonLayoutComponent,
    loadChildren: () => import('./utg/utg.module').then(m => m.UtgModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 5000}}
  ]
})
export class AppRoutingModule { }
