import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MyHttpService } from '../services/my-http.service';
import { Router } from '@angular/router';
import { MyDataService } from '../services/my-data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class HomePage implements OnInit {

  countries: any = [];
  isLoading: boolean = true;
  constructor(private myHttpService: MyHttpService, private router: Router, private myDataService: MyDataService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getCountries();
  }
  async getCountries() {
    try {
      const result = await this.myHttpService.getAllCountries();
      this.countries = result;
    } catch (error) {
      console.error('Error getting countries:', error);
    }
  }

  async openCountryDetails(country: any) {
    await this.myDataService.set('myCountry', country);
    this.router.navigate(['/country-details']);
  }
}