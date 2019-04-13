

export class DuckFeed{

// tslint:disable-next-line: max-line-length
constructor(
  public noOfDucks: number,
  public feedType: string,
  public feedContent: string,
  public feedQuantity: number,
  public time: Date,
  public location: string,
  public scheduled: boolean) {}
}
