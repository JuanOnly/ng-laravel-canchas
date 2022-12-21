export class LocationModel { // actualy profile
  constructor(
    public user_id: BigInt,
    public phone_number: BigInt,
    public url_facebook: string,
    public url_avatar?: string,
    public id?: BigInt
  ) {}
}
