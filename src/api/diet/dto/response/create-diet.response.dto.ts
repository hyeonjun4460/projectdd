import { DietEntity } from '@libs/entity/diet.entity';
import { Exclude, Expose } from 'class-transformer';

export class DietResponseDto {
  @Exclude() private _data: DietEntity;

  constructor(data: DietEntity) {
    this._data = data;
  }

  @Expose()
  get id() {
    return this._data.id;
  }

  @Expose()
  get have() {
    return this._data.have;
  }

  @Expose()
  get userId() {
    return this._data.user.id;
  }

  @Expose()
  get date() {
    return this._data.date;
  }

  @Expose()
  get time() {
    return this._data.time;
  }

  @Expose()
  get foodName() {
    return this._data.foodName;
  }

  @Expose()
  get foodAmount() {
    return this._data.foodAmount;
  }

  @Expose()
  get category() {
    return this._data.category;
  }

  @Expose()
  get place() {
    return this._data.place;
  }

  @Expose()
  get impression() {
    return this._data.impression;
  }
}
