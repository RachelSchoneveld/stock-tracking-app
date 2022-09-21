import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {InsiderSentimentComponent} from "./stocks/insider-sentiment/insider-sentiment.component";
import {CanActivateService} from "./core/can-activate-service.guard";
import {HomeComponent} from "./stocks/home.component";
import {PageNotFoundComponent} from "./core/page-not-found.component";


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'sentiment/:stockSymbol',
    component: InsiderSentimentComponent,
    canActivate: [CanActivateService]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: "enabled"
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
