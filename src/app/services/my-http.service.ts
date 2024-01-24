import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpOptions } from '@capacitor/core';
import { MyDataService } from './my-data.service';

@Injectable({
  providedIn: 'root',
})
export class MyHttpService {
  private allCountriesUrl = 'https://restcountries.com/v3.1/all';

  constructor(private myDataService: MyDataService) { }

  async get(options: HttpOptions) {
    return await CapacitorHttp.get(options);
  }

  async getAllCountries(): Promise<any> {
    const options: HttpOptions = {
      url: this.allCountriesUrl,
      method: 'GET',
    };

    try {
      const response = await CapacitorHttp.get(options);
      return response.data;
    } catch (error) {
      console.error('Error in HTTP request:', error);
      throw error;
    }
  }

  async getWeatherInfo(url: string): Promise<any> {

    const options: HttpOptions = {
      url: url,
      method: 'GET',
    };

    try {
      const response = await CapacitorHttp.get(options);
      return response.data;
    } catch (error) {
      console.error('Error in weather API request:', error);
      throw error;
    }
  }
  async getCurrencyInfo(url: string): Promise<any> {
    try {
      const options: HttpOptions = {
        url: url,
        method: 'GET',
      };

      const response = await CapacitorHttp.get(options);
      return response.data;
    } catch (error) {
      console.error('Error in currency API request:', error);
      throw error;
    }
  }

}
