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
  private duckFeedTimeUTC;

  constructor(
    public countrySelectService: CountrySelectService,
    public duckFeedService: DuckFeedService,
    public handleDuckFeedService: HandleDuckFeedService) { }

  ngOnInit() {

  this.countries = this.countrySelectService.getCountries();
  this.feedTypes = this.duckFeedService.getFeedTypes();
  this.onChoose(this.feedTypeDefault.id);

  }

  onChoose(feedTypeId) {

    this.duckFeedContent = this.duckFeedService.getFeeds().filter((feed) => feed.feedTypeId = feedTypeId);
  }

  onDuckFeedSubmit(dfForm: NgForm) {
    if (dfForm.invalid) {
      return;
    }

    this.duckFeedTimeUTC = moment.utc(dfForm.value.time);
    console.log(this.duckFeedTimeUTC);

    const duckFeed: DuckFeed = {
      noOfDucks: dfForm.value.duckCount,
      feedType: dfForm.value.feedType,
      feedContent: dfForm.value.feed,
      feedQuantity: dfForm.value.feedQuantity,
      time: dfForm.value.time,
      location: dfForm.value.location,
      scheduled: dfForm.value.scheduled
    };

    console.log(duckFeed);
    this.handleDuckFeedService.sendDuckFeed(duckFeed);
    //this.dfForm.reset();
  }

}
