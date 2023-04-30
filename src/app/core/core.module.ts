import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { InputComponent } from './input/input.component';
import { CardsComponent } from './cards/cards.component';
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import { DetailsPipe } from './pipes/details.pipe';
import { ImbdIDPipe } from './pipes/imbd-id.pipe';



@NgModule({
    declarations: [
        NavComponent,
        InputComponent,
        CardsComponent,
        DetailsPipe,
        ImbdIDPipe
    ],
  exports: [
    NavComponent,
    InputComponent
  ],
    imports: [
      BrowserModule,
      CommonModule,
      HttpClientModule
    ]
})
export class CoreModule { }
