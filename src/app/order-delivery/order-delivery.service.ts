import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderDeliveryTimes } from './order-delivery.model';
@Injectable({
  providedIn: 'root',
})
export class OrderDeliveryService {
  constructor(private http: HttpClient) {}

  getTimesForDatePicker(): Observable<OrderDeliveryTimes[]> {
    return this.http.get<OrderDeliveryTimes[]>(
      'https://mock-stg.getpackage-dev.com/times'
    );
  }
}