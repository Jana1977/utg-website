import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';


@NgModule({
    declarations: [
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        FlexLayoutModule,
        MaterialModule
    ],
    providers: []
})
export class SharedModule { }
