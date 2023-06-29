import { WeightEntity } from '@libs/entity/weight.entity';
import { Exclude, Expose } from 'class-transformer';

export class WeightResponseDto {
  @Exclude() private _data: WeightEntity;

  constructor(data: WeightEntity) {
    this._data = data;
  }

  @Expose()
  get id() {
    return this._data.id;
  }

  @Expose()
  get afterWake() {
    return this._data.afterWake;
  }

  @Expose()
  get beforeSleep() {
    return this._data.beforeSleep;
  }

  @Expose()
  get userId() {
    return this._data.user.id;
  }
}
