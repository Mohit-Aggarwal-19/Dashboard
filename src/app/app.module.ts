import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TablesComponent } from './tables/tables.component';
import { ChartsComponent } from './charts/charts.component';
import { NullComponent } from './null/null.component';
import {HttpClientModule} from '@angular/common/http';

import { AppUiModule } from './app-ui/app-ui.module';
@NgModule({
  declarations: [
    AppComponent,
    TablesComponent,
    ChartsComponent,
    NullComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AppUiModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
