import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderDeliveryService } from './order-delivery.service';
import { Subject, takeUntil, tap } from 'rxjs';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import {
  OrderDeliveryCity,
  OrderDeliveryLocation,
} from './order-delivery.model';
import { Store } from '@ngrx/store';
import { token } from '../login/store/login.selector';
import { Loader } from '@googlemaps/js-api-loader';
import { getMapOptions } from './order-delivery.const';

@Component({
  selector: 'delivery-app-order-delivery',
  templateUrl: './order-delivery.component.html',
  styleUrls: ['./order-delivery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderDeliveryComponent implements OnDestroy, OnInit {
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
  selectedDate: Date | null = null;
  holidayDays: string[] = [];
  subTotal = 0;
  dropOffCityPrice = '';
  cityPrice = '';

  googleMapsMap!: google.maps.Map;

  private destroySubject = new Subject<void>();

  constructor(
    private orderDeliveryService: OrderDeliveryService,
    private changeDetectorRef: ChangeDetectorRef,
    private store: Store
  ) {}

  token$ = this.store.select(token);

  ngOnInit() {
    this.initMap();
  }

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
    this.selectedDate = event.value;
    this.selectedDay = event.value?.toString().slice(0, 3) || '';
  }

  submit(): void {
    this.token$
      .pipe(
        tap((token) => {
          console.log(token);
          if (!this.selectedDate || !token) {
            return;
          }
          this.orderDeliveryService
            .submitForm(this.selectedDate, token)
            .subscribe((data) => console.log(data));
        })
      )
      .subscribe();
  }

  onDropOffCityChanged(value: OrderDeliveryCity): void {
    this.dropOffCityPrice = value.price;
    this.DisplayMarkerByCityName(value.enName);
    if (this.dropOffCityPrice === this.cityPrice) {
      this.subTotal = +this.dropOffCityPrice;
    } else {
      this.subTotal = +(+(this.dropOffCityPrice + this.cityPrice) + 10);
    }
  }

  onCityChanged(value: OrderDeliveryCity): void {
    this.cityPrice = value.price;
    this.DisplayMarkerByCityName(value.enName);
    if (this.dropOffCityPrice === this.cityPrice) {
      this.subTotal = +this.cityPrice;
    } else {
      this.subTotal = +(+(this.dropOffCityPrice + this.cityPrice) + 10);
    }
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

  private initMap(): void {
    const loader = new Loader({
      apiKey: 'AIzaSyA5DZolXRvgGAEoBLdFmyOnfm0-e22ZErE',
      version: 'weekly',
    });

    loader.load().then(() => {
      this.googleMapsMap = new google.maps.Map(
        document.getElementById('map') as HTMLElement,
        getMapOptions()
      );
    });
  }
  private DisplayMarkerByCityName(cityName: string): void {
    const geocoder = new google.maps.Geocoder();
    let location: OrderDeliveryLocation;

    geocoder.geocode({ address: cityName }, (results, status) => {
      if (status !== google.maps.GeocoderStatus.OK || !results) {
        return;
      }
      location = {
        lat: results[0].geometry.location.lat(),
        lng: results[0].geometry.location.lng(),
      };
      const marker = new google.maps.Marker({
        position: location,
      });
      marker.setMap(this.googleMapsMap);
    });
  }
}
