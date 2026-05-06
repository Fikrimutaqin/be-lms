import { Injectable, BadRequestException } from '@nestjs/common';
import { existsSync, mkdirSync, unlinkSync } from 'fs';
import { join } from 'path';

@Injectable()
export class UploadsService {
  private readonly uploadPath = './uploads/images';

  constructor() {
    // Jalankan pengecekan folder saat aplikasi dijalankan
    this.ensureUploadPathExists();
  }

  /**
   * Memastikan folder tujuan upload sudah ada di server.
   * Jika belum ada, maka akan dibuatkan secara otomatis.
   */
  private ensureUploadPathExists() {
    if (!existsSync(this.uploadPath)) {
      mkdirSync(this.uploadPath, { recursive: true });
    }
  }

  /**
   * Mengonversi nama file menjadi URL publik.
   */
  formatFileUrl(filename: string): string {
    return `/uploads/images/${filename}`;
  }

  /**
   * Menghapus file fisik dari sistem penyimpanan server.
   */
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
