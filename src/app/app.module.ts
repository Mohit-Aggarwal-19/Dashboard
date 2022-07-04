import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TablesComponent } from './tables/tables.component';
import { ChartsComponent } from './charts/charts.component';
import { NullComponent } from './null/null.component';

import {HttpClientModule} from '@angular/common/http';
import { AppUiModule } from './app-ui/app-ui.module';
import { HighchartsChartModule } from 'highcharts-angular';
import {  ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from './null/table/table.component';
import { DummyComponent } from './dummy/dummy.component';


@NgModule({
  declarations: [
    AppComponent,
    TablesComponent,
    ChartsComponent,
    NullComponent,
    TableComponent,
    DummyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AppUiModule,
    HighchartsChartModule,
    
    ReactiveFormsModule
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
