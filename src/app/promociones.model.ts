export class Promociones {
  public id:string;
  public title:string;
  public price: string;
  public address:string;
  public latitude: string;
  public longitude: string;
  public created_at:string;
  public updated_at: string;
  constructor(
    id:string,
    title:string,
    price:string,
    address:string,
    latitude:string,
    longitude:string,
    created_at:string,
    updated_at:string,
  ){
    this.id=id;
    this.title=title;
    this.price=price;
    this.address=address;
    this.latitude=latitude;
    this.longitude=longitude;
    this.created_at=created_at;
    this.updated_at=updated_at;
  }
}
