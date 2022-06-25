import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TablesComponent } from './tables/tables.component';
import { ChartsComponent } from './charts/charts.component';
import { NullComponent } from './null/null.component';
const routes: Routes = [
  { path: 'Tables', component: TablesComponent },
  { path: 'Charts', component: ChartsComponent },
  { path: '**', component: NullComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
