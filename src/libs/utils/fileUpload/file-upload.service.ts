import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class FileUploadService {
  constructor(private readonly config: ConfigService) {}
  async createPresignedUrl(Key: string) {
    const client: S3Client = new S3Client({
      region: this.config.get('AWS_REGION'),
      credentials: {
        accessKeyId: this.config.get('AWS_ACCESS_KEY'),
        secretAccessKey: this.config.get('AWS_SECRET_KEY'),
      },
    });
    const command: PutObjectCommand = new PutObjectCommand({
      Bucket: this.config.get('AWS_S3_BUCKET'),
      Key,
      ContentType: 'image/png',
    });

    const expiresIn = Number(this.config.get('AWS_URL_EXPIRE_TIME'));
    return await getSignedUrl(client, command, {
      expiresIn,
    });
  }
}
