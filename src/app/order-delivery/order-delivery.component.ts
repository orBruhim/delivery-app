import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'delivery-app-order-delivery',
  templateUrl: './order-delivery.component.html',
  styleUrls: ['./order-delivery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderDeliveryComponent {
  deliveryForm = new FormGroup({
    name: new FormControl(),
    phoneNumber: new FormControl(
      '',
      Validators.pattern(/05[023489]-?\\d{3}-?\\d{4}/)
    ),
    address: new FormControl(),
    cityList: new FormControl(),
    receiverName: new FormControl(),
    receiverPhoneNumber: new FormControl(
      '',
      Validators.pattern('/05[023489]-?\\d{3}-?\\d{4}/')
    ),
    dropOffAddress: new FormControl(),
    dropOffCityList: new FormControl(),
  });
}
