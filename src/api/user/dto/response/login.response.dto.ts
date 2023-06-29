import { UserEntity } from '@libs/entity/user.entity';
import { Exclude, Expose } from 'class-transformer';

export class LoginResponseDto {
  @Exclude() private _data: UserEntity;

  constructor(data: UserEntity) {
    this._data = data;
  }

  @Expose()
  get id() {
    return this._data.id;
  }

  @Expose()
  get userName() {
    return this._data.userName;
  }
}
