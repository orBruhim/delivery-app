import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderDeliveryRoutingModule } from './order-delivery-routing.module';
import { OrderDeliveryComponent } from './order-delivery.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [OrderDeliveryComponent],
  imports: [
    CommonModule,
    OrderDeliveryRoutingModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
})
export class OrderDeliveryModule {}
