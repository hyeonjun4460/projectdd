import { DietEntity } from '@libs/entity/diet.entity';
import { Exclude, Expose } from 'class-transformer';

export class DietResponseDto {
  @Exclude() private _data: { diet: DietEntity; presignedUrl?: string };

  constructor(data: { diet: DietEntity; presignedUrl?: string }) {
    this._data = data;
  }

  @Expose()
  get id() {
    return this._data.diet.id;
  }

  @Expose()
  get have() {
    return this._data.diet.have;
  }

  @Expose()
  get userId() {
    return this._data.diet.user.id;
  }

  @Expose()
  get date() {
    return this._data.diet.date;
  }

  @Expose()
  get time() {
    return this._data.diet.time;
  }

  @Expose()
  get foodName() {
    return this._data.diet.foodName;
  }

  @Expose()
  get foodAmount() {
    return this._data.diet.foodAmount;
  }

  @Expose()
  get category() {
    return this._data.diet.category;
  }

  @Expose()
  get place() {
    return this._data.diet.place;
  }

  @Expose()
  get impression() {
    return this._data.diet.impression;
  }

  @Expose()
  get presignedUrl() {
    return this._data.presignedUrl;
  }
}
