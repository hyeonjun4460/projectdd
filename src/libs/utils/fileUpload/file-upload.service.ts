import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class FileUploadService {
  constructor(private readonly config: ConfigService) {}
  private client: S3Client = new S3Client({
    region: this.config.get('AWS_REGION'),
    credentials: {
      accessKeyId: this.config.get('AWS_ACCESS_KEY'),
      secretAccessKey: this.config.get('AWS_SECRET_KEY'),
    },
  });

  private expiresIn = Number(this.config.get('AWS_URL_EXPIRE_TIME'));
  async createPostURL(Key: string) {
    const command: PutObjectCommand = new PutObjectCommand({
      Bucket: this.config.get('AWS_S3_BUCKET'),
      Key,
    });

    return await getSignedUrl(this.client, command, {
      expiresIn: this.expiresIn,
    });
  }

  async createDeleteURL(Key: string) {
    const command: DeleteObjectCommand = new DeleteObjectCommand({
      Bucket: this.config.get('AWS_S3_BUCKET'),
      Key,
    });

    return await getSignedUrl(this.client, command, {
      expiresIn: this.expiresIn,
    });
  }
}
