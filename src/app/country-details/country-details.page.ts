import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MyDataService } from '../services/my-data.service';
import { MyHttpService } from '../services/my-http.service';
import { DecimalPipe } from '@angular/common';


@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.page.html',
  styleUrls: ['./country-details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, DecimalPipe]
})
export class CountryDetailsPage implements OnInit {
  countryAttributes: any[] = [];
  flagUrl: string = '';
  storedResult: any = {};
  currencyAmount!: number;
  weather: any;
  latLng: any;
  convertedAmount!: number;
  updatedAmount!: number;


  constructor(private myHttpService: MyHttpService, private myDataService: MyDataService) { }

  ngOnInit() { }

  async ionViewWillEnter() {
    await this.getCountryDetails();
    this.getWeather();
  }

  async getCountryDetails() {
    try {
      this.storedResult = await this.myDataService.get("myCountry");
      this.latLng = this.storedResult.capitalInfo?.latlng;

      if (this.storedResult && this.storedResult.name) {
        const attributeMapping = {
          official: 'Official Name',
          currencies: 'Currency',
          capital: 'Capital',
          languages: 'Languages',
          population: 'Population',
          flags: 'Flag',
        };

        this.countryAttributes = Object.entries(attributeMapping).map(([key, label]) => {
          if (key === 'flags' && this.storedResult.flags && this.storedResult.flags.png) {
            this.flagUrl = this.storedResult.flags.png;
            return { label, value: this.flagUrl };
          }
          return { label, value: this.storedResult[key] };
        });
      } else {
        console.error("Unable to retrieve country details from storage");
      }
    } catch (error) {
      console.error("Error retrieving country details from storage:", error);
    }
  }
  getLanguages(languages: any): string[] {
    if (languages) {
      return Object.values(languages);
    }
    return [];
  }

  getFirstCurrency(currencies: any): string {
    if (currencies) {
      const firstCurrency = Object.keys(currencies)[0];
      return firstCurrency || 'Currency Name Not Available';
    }
    return 'Currency Name Not Available';
  }

  async getWeather() {
    try {
      if (this.latLng && this.latLng.length === 2) {
        const weatherUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${this.latLng[0]},${this.latLng[1]}?key=PUPSFE4HZBZ249GJFUCJUHPBS`;
        const weatherResponse = await this.myHttpService.getWeatherInfo(weatherUrl);
        this.weather = weatherResponse?.description;
      } else {
        console.error("Invalid latitude and longitude for weather request");
      }
    } catch (error) {
      console.error("Error retrieving weather information:", error);
    }
  }

  async convertToEUR() {
    try {
      const userAmount = this.currencyAmount;
      const updatedAmount = new DecimalPipe('en-US').transform(this.currencyAmount, '1.4-4');
      const formattedAmount = updatedAmount ? updatedAmount.padStart(9, '0') : '';
      const firstCurrencyCode = this.getFirstCurrency(this.storedResult.currencies);
      const exchangeRateUrl = `https://v6.exchangerate-api.com/v6/d0718ee61cff18719c39e087/pair/${firstCurrencyCode}/EUR/${formattedAmount}`;
      const exchangeRateResponse = await this.myHttpService.getCurrencyInfo(exchangeRateUrl);
      const convertedAmount = exchangeRateResponse.conversion_result;
      this.convertedAmount = convertedAmount;
      console.log("Converted amount " + convertedAmount);
    } catch (error) {
      console.error('Error converting to EUR:', error);
    }
  }
}
