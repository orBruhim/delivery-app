import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderDeliveryRoutingModule } from './order-delivery-routing.module';
import { OrderDeliveryComponent } from './order-delivery.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [OrderDeliveryComponent],
  imports: [
    CommonModule,
    OrderDeliveryRoutingModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
})
export class OrderDeliveryModule {}
