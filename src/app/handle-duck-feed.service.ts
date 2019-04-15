/* This Service provides an interface to communicate with the Backend NodeJs Server with GUI form values
@Abhay
*/
import { DuckFeed } from './duck-feed.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HandleDuckFeedService{

  constructor(private http: HttpClient) { }

// This method performs the HTTP POST operaton and sends requests and handles response from the server
  sendDuckFeed(duckFeedObj: DuckFeed) {
    const duckFeed = duckFeedObj;
    this.http.post<{message: string}>('http://localhost:3000/api/duckfeed', duckFeed)
    .subscribe((response) =>{
      console.log(response.message);
    });
  }
}
