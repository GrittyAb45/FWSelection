import { DuckFeed } from './duck-feed.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HandleDuckFeedService{

  constructor(private http: HttpClient) { }

  sendDuckFeed(duckFeedObj: DuckFeed) {
    const duckFeed = duckFeedObj;
    this.http.post<{message: string}>('http://localhost:3000/api/duckfeed', duckFeed)
    .subscribe((response) =>{
      console.log(response.message);
    });
  }
}
