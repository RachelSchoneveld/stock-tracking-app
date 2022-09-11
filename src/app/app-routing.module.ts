import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {InsiderSentimentComponent} from "./insider-sentiment/insider-sentiment.component";
import {PageNotFoundComponentComponent} from "./page-not-found-component/page-not-found-component.component";


const routes: Routes = [
  {
    path: 'sentiment/:symbol',
    component: InsiderSentimentComponent
  },
  {
    path: '**',
    component: PageNotFoundComponentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
