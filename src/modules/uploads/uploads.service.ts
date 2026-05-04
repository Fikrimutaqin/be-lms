import { Injectable, BadRequestException } from '@nestjs/common';
import { existsSync, mkdirSync, unlinkSync } from 'fs';
import { join } from 'path';

@Injectable()
export class UploadsService {
  private readonly uploadPath = './uploads/images';

  constructor() {
    // Pastikan folder upload ada saat service diinisialisasi
    this.ensureUploadPathExists();
  }

  private ensureUploadPathExists() {
    if (!existsSync(this.uploadPath)) {
      mkdirSync(this.uploadPath, { recursive: true });
    }
  }

  formatFileUrl(filename: string): string {
    // Mengembalikan path yang bisa diakses via static assets
    return `/uploads/images/${filename}`;
  }

  async deleteFile(filename: string) {
    const filePath = join(process.cwd(), 'uploads/images', filename);
    try {
      if (existsSync(filePath)) {
        unlinkSync(filePath);
        return { message: 'File deleted successfully' };
      }
      throw new BadRequestException('File not found');
    } catch (error) {
      throw new BadRequestException(`Could not delete file: ${error.message}`);
    }
  }
}
