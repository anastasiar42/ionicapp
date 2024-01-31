# Country, Weather & Exchange Rate App

@author Anastasiia Ryzhkova
@version TypeScript 5.2.2, Ionic 7.1.6, Angular 16.1.6, Node 20.10.0

# To run
App is launched with ionic serve command from project directory

## Functionality covered

The following functionality implemented in the app:

1. **Display list of countries from** https://restcountries.com
    1.1. HTML for home page is in home.page.html, each country in the list implemented as <ion-button> with routing to 
    country-details page.
    1.2. Getting data from https://restcountries.com/v3.1/all implemented in MyHttpService.
    1.3. Storing data to IndexedDB implemented in MyDataService
2. **Display country details (official name, capital, population)**
    2.1. HTML for country-details page is in country-details.page.html with official name, capital and population obtained from 
IndexedDB
    2.2. Getting of flag, capital and official name handled in country-details.page.ts getCountryDetails() .
3. **Display weather from** https://weather.visualcrossing.com
    3.1. Weather receiving is handled in country-details.page.ts getWeather() with helper method in my-http.service.ts 
getWeatherInfo()
4. **Display list of languages**
    4.1. Getting languages stored in IndexedDB is handled in country-details.page.ts getLanguages()
    4.2. In HTML iteration through languages performed with *ngFor="let language of 
getLanguages(storedResult.languages)"
5. **Display currency in input “Enter {{currency}} amount”**
    5.1. Getting the first currency symbol is implemented in country-details.page.ts getFirstCurrency(). 
This value is used in HTML
6. **Convert to EUR button conversion with** https://v6.exchangerate-api.com/
    6.1. Conversion is performed in in country-details.page.ts convertToEUR()
    6.2. Url for conversion is composed from country currency code received via getFirstCurrency(), 
amount input by user formatted to xxxx.xxxx required by API with Angular DecimalPipe and my API key
    6.3. Helper method for requesting exchange created in my-http.service.ts getCurrencyInfo
