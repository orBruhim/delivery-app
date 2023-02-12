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
import { getMapOptions } from './order-delivery.const';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'delivery-app-order-delivery',
  templateUrl: './order-delivery.component.html',
  styleUrls: ['./order-delivery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderDeliveryComponent implements OnDestroy, OnInit {
  citiesList$ = this.orderDeliveryService.getCities();
  token$ = this.store.select(token);

  deliveryForm = new FormGroup({
    name: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', [
      Validators.required,
      // Validators.pattern(/05[023489]-?\\d{3}-?\\d{4}/),
    ]),
    address: new FormControl('', Validators.required),
    cityList: new FormControl('', Validators.required),
    receiverName: new FormControl('', Validators.required),
    receiverPhoneNumber: new FormControl('', [
      Validators.required,
      // Validators.pattern('/05[023489]-?\\d{3}-?\\d{4}/'),
    ]),
    dropOffAddress: new FormControl('', Validators.required),
    dropOffCityList: new FormControl('', Validators.required),
  });

  hours: string[] = [];
  selectedDay = '';
  selectedDate: Date | null = null;
  holidayDays: string[] = [];
  subTotal = 0;
  dropOffCityPrice = '';
  cityPrice = '';
  googleMapsMap!: google.maps.Map;
  cityMarker: google.maps.Marker | null = null;
  dropOffCityMarker: google.maps.Marker | null = null;
  private directionsService = new google.maps.DirectionsService();
  private directionsRenderer = new google.maps.DirectionsRenderer();
  private destroySubject = new Subject<void>();

  constructor(
    private orderDeliveryService: OrderDeliveryService,
    private changeDetectorRef: ChangeDetectorRef,
    private store: Store,
    private _snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.initMap();
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
  }

  getDatesFilter = (date: Date | null): boolean => {
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
          if (!this.selectedDate || !token) {
            return;
          }
          this.orderDeliveryService.submitForm(this.selectedDate, token);
          this.deliveryForm.reset();
          this.displaySuccessToast();
        })
      )
      .subscribe();
  }

  onDropOffCityChanged(value: OrderDeliveryCity): void {
    this.dropOffCityPrice = value.price;
    this.DisplayMarkerByCityName(value.enName, true);
  }

  onCityChanged(value: OrderDeliveryCity): void {
    this.cityPrice = value.price;
    this.DisplayMarkerByCityName(value.enName, false);
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
    this.googleMapsMap = new google.maps.Map(
      document.getElementById('map') as HTMLElement,
      getMapOptions()
    );
  }

  private DisplayMarkerByCityName(
    cityName: string,
    isDropOffCity: boolean
  ): void {
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

      if (isDropOffCity) {
        this.dropOffCityMarker?.setMap(null);

        this.dropOffCityMarker = new google.maps.Marker({ position: location });
        this.dropOffCityMarker?.setMap(this.googleMapsMap);

        if (this.dropOffCityPrice === this.cityPrice) {
          this.subTotal = +this.dropOffCityPrice;
        } else {
          this.subTotal = +(+(this.dropOffCityPrice + this.cityPrice) + 10);
        }
      } else {
        this.cityMarker?.setMap(null);
        this.cityMarker = new google.maps.Marker({ position: location });
        this.cityMarker?.setMap(this.googleMapsMap);

        if (this.dropOffCityPrice === this.cityPrice) {
          this.subTotal = +this.cityPrice;
        } else {
          this.subTotal = +(+(this.dropOffCityPrice + this.cityPrice) + 10);
        }
      }
      this.createRoute();
    });
  }

  private createRoute(): void {
    this.directionsRenderer.setMap(null);

    if (
      this.cityMarker?.getPosition() &&
      this.dropOffCityMarker?.getPosition()
    ) {
      const request = {
        origin: this.cityMarker?.getPosition() as google.maps.LatLng,
        destination:
          this.dropOffCityMarker?.getPosition() as google.maps.LatLng,
        travelMode: google.maps.TravelMode.DRIVING,
      };

      this.directionsService.route(request, (response, status) => {
        if (status == 'OK') {
          this.directionsRenderer.setMap(this.googleMapsMap);

          this.directionsRenderer?.setDirections(response);
        }
      });
    }
  }

  private displaySuccessToast(): void {
    this._snackBar.open('Your order confirmed!', '', {
      duration: 1500,
    });
  }
}

//:TODO:
//submit
