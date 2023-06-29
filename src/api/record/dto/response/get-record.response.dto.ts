import { DietResponseDto } from '@api/diet/dto/response/create-diet.response.dto';
import { WeightResponseDto } from '@api/weight/dto/response/weight.response.dto';
import { Exclude, Expose } from 'class-transformer';

export class GetRecordReponseDto {
  @Exclude() private _data: {
    weight: WeightResponseDto[];
    diet: DietResponseDto[];
  };
  @Exclude() private _user: { id: number };

  constructor(
    data: { weight: WeightResponseDto[]; diet: DietResponseDto[] },
    user: { id: number },
  ) {
    this._data = data;
    this._user = user;
  }

  @Expose()
  get weight() {
    return this._data.weight;
  }

  @Expose()
  get diet() {
    return this._data.diet;
  }

  @Expose()
  get userId() {
    return this._user.id;
  }
}
