/* The MainDataComponent is the core component of this Application. It receives data from the user and verifies/validates
 accordingly with data models and forwards the requests to the server and also processes the response from the server

 @Abhay
*/
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Country } from '../country.model';
import { CountrySelectService } from '../country-select.service';
import { DuckFeedType } from '../duck-feed-type.model';
import { DuckFeedService } from '../feeds.services';
import { DuckFeedContent } from '../duck-feed-content.model';
import { DuckFeed } from '../duck-feed.model';
import { NgForm } from '@angular/forms';
import { HandleDuckFeedService } from '../handle-duck-feed.service';

@Component({
  selector: 'app-maindata',
  templateUrl: './main-data.component.html',
  styleUrls: ['./main-data.component.css']
})

export class MainDataComponent implements OnInit {

  public feedTypeDefault: DuckFeedType = new DuckFeedType(2, 'Natural or Raw');
  public countries: Country[];
  public feedTypes: DuckFeedType[];
  public duckFeedContent: DuckFeedContent[];
  public dateTime2: Date;
  public name: string;
  public email: string;
  public phone: string;
  public infoMsgFlag = false;
  public checkboxValue = false;
  private duckFeedTimeUTC: moment.Moment;

  constructor(
    public countrySelectService: CountrySelectService,
    public duckFeedService: DuckFeedService,
    public handleDuckFeedService: HandleDuckFeedService) { }

  ngOnInit() {

  this.countries = this.countrySelectService.getCountries();
  this.feedTypes = this.duckFeedService.getFeedTypes();
  this.onChoose(this.feedTypeDefault.id);

  }

  // This method provides options in the dropdown feed and feedtypes
  onChoose(feedTypeId) {

    this.duckFeedContent = this.duckFeedService.getFeeds().filter((feed) => feed.feedTypeId = feedTypeId);
  }

  getCheckBoxvalue(event){
    this.checkboxValue = event.target.checked;
  }

  // this method gets triggered upon the submit click action; gathers user input and calls handle duck feed service methods
  // to send http requests
  onDuckFeedSubmit(dfForm: NgForm) {
    if (dfForm.invalid) {
      return;
    }
    this.name = dfForm.value.name;
    this.email = dfForm.value.email;
    this.phone = dfForm.value.phone;

    if (this.name === '' || this.name === null) {
      this.name = 'Not provided';
    }

    if (this.email === '' || this.email === null) {
      this.email = 'Not provided';
    }

    if (this.phone === '' || this.phone === null) {
      this.phone = 'Not provided';
    }

    this.duckFeedTimeUTC = moment.utc(dfForm.value.time);

    const duckFeed: DuckFeed = {
      ownerName: dfForm.value.ownerName,
      email: this.email,
      phone: this.phone,
      noOfDucks: dfForm.value.duckCount,
      feedType: dfForm.value.feedType,
      feedContent: dfForm.value.feed,
      feedQuantity: dfForm.value.feedQuantity,
      time: dfForm.value.time,
      location: dfForm.value.location,
      scheduled: this.checkboxValue
    };

    console.log(duckFeed);
    this.handleDuckFeedService.sendDuckFeed(duckFeed);
    this.infoMsgFlag = true;
    setTimeout(() => {
      this.infoMsgFlag = false;
      dfForm.resetForm();
      } , 7000);

  }

}
