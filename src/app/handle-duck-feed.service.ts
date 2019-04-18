/* This Service provides an interface to communicate with the Backend NodeJs Server with GUI form values
@Abhay
*/
import { DuckFeed } from './duck-feed.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const serverUrl = environment.apiUrl;

@Injectable()
export class HandleDuckFeedService{

  constructor(private http: HttpClient) { }

// This method performs the HTTP POST operaton and sends requests and handles response from the server
  sendDuckFeed(duckFeedObj: DuckFeed) {
    const duckFeed = duckFeedObj;
    if(duckFeed.scheduled!==null && duckFeed.scheduled){

      this.http.post<{message: string}>(serverUrl + '/duckfeed/scheduled', duckFeed)
      .subscribe((response) =>{
        console.log(response.message);
      });

    }
    this.http.post<{message: string}>(serverUrl + '/duckfeed', duckFeed)
    .subscribe((response) =>{
      console.log(response.message);
    });
  }
}
