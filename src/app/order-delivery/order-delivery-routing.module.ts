import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderDeliveryComponent } from './order-delivery.component';
import { LoginGuard } from '../login/login.guard';

const routes: Routes = [
  { path: '', component: OrderDeliveryComponent, canActivate: [LoginGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderDeliveryRoutingModule {}
