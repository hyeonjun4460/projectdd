import { Exclude, Expose } from 'class-transformer';

export class ResponseDto<T> {
  @Exclude() private _message: string;
  @Exclude() private _data?: T;

  constructor(message: string, data?: T) {
    this._message = message;
    this._data = data;
  }

  @Expose()
  get message() {
    return this._message;
  }

  @Expose()
  get data() {
    return this._data;
  }
}
