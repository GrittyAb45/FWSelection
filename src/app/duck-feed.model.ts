

export class DuckFeed{

// tslint:disable-next-line: max-line-length
constructor(
  public ownerName: string,
  public email: string,
  public phone: string,
  public noOfDucks: number,
  public feedType: string,
  public feedContent: string,
  public feedQuantity: number,
  public time: Date,
  public location: string,
  public scheduled: boolean) {}
}
