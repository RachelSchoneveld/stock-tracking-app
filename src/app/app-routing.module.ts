import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {InsiderSentimentComponent} from "./insider-sentiment/insider-sentiment.component";
import {CanActivateService} from "./can-activate-service.guard";


const routes: Routes = [
  {
    path: 'sentiment/:stockSymbol',
    component: InsiderSentimentComponent,
    canActivate: [CanActivateService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: "enabled"
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
