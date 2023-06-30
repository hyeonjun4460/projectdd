import { DataMapperService } from '@libs/utils/mapper/data-mapper.service';
import { Injectable } from '@nestjs/common';
import { DietRepository } from './diet.repository';
import { FileUploadService } from '@libs/utils/fileUpload/file-upload.service';

@Injectable()
export class DietService {
  constructor(
    private readonly mapper: DataMapperService,
    private readonly repo: DietRepository,
    private readonly fileuploader: FileUploadService,
  ) {}
  async create(
    userId: { id: number },
    date: string,
    time: string,
    category: 'breakfast' | 'lunch' | 'dinner',
    foodName: string,
    foodAmount: number,
    place: string,
    impression: string,
    have: boolean,
    fileUpload: boolean,
  ) {
    const user = this.mapper.mapUser(userId);
    const diet = this.mapper.mapDiet({ user, date, have, category });
    if (have) {
      Object.assign(diet, {
        time,
        foodName,
        foodAmount,
        place,
        have,
        impression,
      });
    }

    let presignedUrl: string;
    if (fileUpload) {
      presignedUrl = await this.fileuploader.createPostURL(
        `${date}_${category}_user_${userId.id}.png`,
      );
    }
    return { diet: await this.repo.create(diet), presignedUrl };
  }

  async findOne(id: number, userId: { id: number }) {
    const user = this.mapper.mapUser(userId);
    const diet = this.mapper.mapDiet({ id, user });
    return await this.repo.findOne(diet);
  }

  async getPresignedUrl(key: string) {
    return await this.fileuploader.createPostURL(key);
  }

  async delete(id: number, userId: { id: number }) {
    const user = this.mapper.mapUser(userId);
    const diet = this.mapper.mapDiet({ id });
    return this.repo.delete(diet, user);
  }
}
