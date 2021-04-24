import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReaderComponent } from './components/reader/reader.component';
import { FunficListComponent } from './components/funfic-list/funfic-list.component';

const routes: Routes = [
  { path: '', component: FunficListComponent },
  { path: ':id', component: ReaderComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
