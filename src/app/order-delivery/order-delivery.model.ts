export interface OrderDeliveryTimes {
  day: string;
  times: string[];
}

export interface OrderDeliveryCity {
  price: string;
  enName: string;
  heName: string;
}

export interface SubmitResponse {
  status: string;
}

export interface OrderDeliveryLocation {
  lat: number;
  lng: number;
}
