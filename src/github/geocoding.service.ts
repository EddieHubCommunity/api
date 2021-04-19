import { HttpService, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { GithubLocation } from './interfaces/github.interface';

interface Address {
  tourism: string;
  house_number: string;
  road: string;
  quarter: string;
  city: string;
  state_district: string;
  state: string;
  postcode: string;
  country: string;
  country_code: string;
}

interface GeocodedResponse {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  boundingbox: string[];
  lat: string;
  lon: string;
  display_name: string;
  class: string;
  type: string;
  importance: number;
  icon: string;
  address: Address;
}

@Injectable()
export class GeocodingService {
  constructor(private http: HttpService) {}

  async fetchCoordinates(location: string): Promise<GithubLocation> {
    const url = `https://nominatim.openstreetmap.org/?addressdetails=1&q=${encodeURIComponent(
      location,
    )}&format=json&limit=1`;

    const response: AxiosResponse = await this.http.get(url).toPromise();
    const data: GeocodedResponse = response.data[0];
    const locationObject: GithubLocation = {
      provided: location,
      lat: parseFloat(data.lat),
      long: parseFloat(data.lon),
    };
    return locationObject;
  }
}
