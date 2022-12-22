export class RatingModel {
  constructor(
    public comment: string,
    public rating: BigInt,
    public field_id: BigInt
  ) {}
}
