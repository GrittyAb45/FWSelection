import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainDataComponent } from './duckfeeddata/main-data.component';
import { ReportComponent } from './report/report.component';

const routes: Routes = [
  {path: '',  component: MainDataComponent },
  {path: 'report', component: ReportComponent}
];

@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule{

}
