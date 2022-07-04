import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { A11yModule } from '@angular/cdk/a11y';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';

const uiModules = [
  BrowserAnimationsModule,
  MatPaginatorModule,
  MatTableModule,
  MatSortModule,
  A11yModule,
  MatButtonModule,
  MatIconModule,
  MatSidenavModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatFormFieldModule,
  MatCheckboxModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, uiModules],
  exports: [uiModules],
})
export class AppUiModule { }
