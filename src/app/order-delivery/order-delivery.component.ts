import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderDeliveryService } from './order-delivery.service';
import { Subject, takeUntil, tap } from 'rxjs';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { OrderDeliveryCity } from './order-delivery.model';

@Component({
  selector: 'delivery-app-order-delivery',
  templateUrl: './order-delivery.component.html',
  styleUrls: ['./order-delivery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderDeliveryComponent implements OnDestroy {
  citiesList$ = this.orderDeliveryService.getCities();
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

  hours: string[] = [];
  selectedDay = '';
  holidayDays: string[] = [];
  subTotal = 0;
  dropOffCityPrice = '';
  cityPrice = '';

  private destroySubject = new Subject<void>();

  constructor(
    private orderDeliveryService: OrderDeliveryService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnDestroy(): void {
    this.destroySubject.next();
  }

  datesFilter = (date: Date | null): boolean => {
    this.getTimesForDatePicker();
    if (!date) {
      return false;
    }
    const currentDate = new Date();

    return (
      !this.holidayDays.includes(date?.toString().slice(0, 3)) &&
      date > currentDate
    );
  };

  onDateSelected(event: MatDatepickerInputEvent<Date>): void {
    this.selectedDay = event.value?.toString().slice(0, 3) || '';
  }

  private getTimesForDatePicker(): void {
    this.orderDeliveryService
      .getTimesForDatePicker()
      .pipe(
        takeUntil(this.destroySubject),
        tap((relevantHours) => {
          relevantHours.map((orderDeliveryTimes) => {
            const { day, times } = orderDeliveryTimes;
            if (day === this.selectedDay && times) {
              this.hours = [...times];
            }
            if (!times.length) {
              this.holidayDays.push(day);
              this.changeDetectorRef.detectChanges();
            }
          });
        })
      )
      .subscribe();
  }

  submit(): void {
    console.log(this.deliveryForm.value);
  }

  dropOffCityChanged(value: OrderDeliveryCity): void {
    this.dropOffCityPrice = value.price;
    if (this.dropOffCityPrice === this.cityPrice) {
      this.subTotal = +this.dropOffCityPrice;
    } else {
      this.subTotal = +(this.dropOffCityPrice + this.cityPrice + 10);
    }
  }

  cityChanged(value: OrderDeliveryCity): void {
    this.cityPrice = value.price;
    if (this.dropOffCityPrice === this.cityPrice) {
      this.subTotal = +this.cityPrice;
    } else {
      this.subTotal = +(this.dropOffCityPrice + this.cityPrice + 10);
    }
  }
}
