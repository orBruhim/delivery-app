import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  OrderDeliveryCity,
  OrderDeliveryTimes,
  SubmitResponse,
} from './order-delivery.model';
import { LoginResponse } from '../login/login.model';
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

  getCities(): Observable<OrderDeliveryCity[]> {
    return this.http.get<OrderDeliveryCity[]>(
      ' https://mock-stg.getpackage-dev.com/cities'
    );
  }

  submitForm(
    selectedDate: Date,
    token: LoginResponse
  ): Observable<SubmitResponse> {
    const requestParams = {
      date: selectedDate,
      token: token.token,
    };
    console.log(token);
    console.log(JSON.stringify(requestParams));
    return this.http.post<SubmitResponse>(
      'https://mock-stg.getpackage-dev.com/submit',
      JSON.stringify(requestParams)
    );
  }
}
