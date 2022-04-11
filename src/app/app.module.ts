import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { FullLayoutComponent } from './layout/full-layout/full-layout.component';
import { CommonLayoutComponent } from './layout/common-layout/common-layout.component';
import { SharedModule } from './common/shared.module';
import { FooterComponent } from './common/footer/footer.component';
import { HeaderComponent } from './common/header/header.component';
import { LoaderComponent } from './loader/loader.component';
import { WelcomeHeaderComponent } from './common/welcome-header/welcome-header.component';


@NgModule({
  declarations: [
    AppComponent,
    CommonLayoutComponent,
    FullLayoutComponent,
    HeaderComponent,
    FooterComponent,
    LoaderComponent,
    WelcomeHeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    MaterialModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
