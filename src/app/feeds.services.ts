import { DuckFeedType } from './duck-feed-type.model';
import { DuckFeedContent } from './duck-feed-content.model';

export class DuckFeedService {

duckFeedType: DuckFeedType[] = [
  new DuckFeedType(1, 'Processed'),
  new DuckFeedType(2, 'Natural or Raw')
];

feeds: DuckFeedContent[] = [
  new DuckFeedContent(1, 1, 'Corn'),
  new DuckFeedContent(2, 1, 'beans'),
  new DuckFeedContent(3, 2, 'rice'),
  new DuckFeedContent(4, 2, 'pulse seeds'),
  new DuckFeedContent(5, 2, 'chopped veggies')

]

getFeedTypes(){
  return [...this.duckFeedType];
}

getFeeds(){
  return [...this.feeds];
}
}
