import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Delete,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { UploadsService } from './uploads.service';

@ApiTags('Uploads')
@ApiBearerAuth()
@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  /**
   * Endpoint untuk mengupload gambar (Profile, Thumbnail Kursus, dll).
   * File disimpan di server lokal (diskStorage) dengan nama yang unik.
   * Batasan: Maksimal 2MB, format gambar saja.
   */
  @Post('image')
  @ApiOperation({ summary: 'Upload an image' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/images',
        filename: (req, file, cb) => {
          // Buat nama file unik menggunakan timestamp dan angka random
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        // Hanya izinkan file gambar
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
          return cb(new BadRequestException('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
      limits: {
        fileSize: 2 * 1024 * 1024, // Limit 2MB
      },
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    const fileUrl = this.uploadsService.formatFileUrl(file.filename);
    
    return {
      message: 'File uploaded successfully',
      data: {
        url: fileUrl,
        filename: file.filename,
      }
    };
  }

  /**
   * Menghapus file gambar yang sudah diupload dari storage server.
   */
  @Delete('image/:filename')
  @ApiOperation({ summary: 'Delete an uploaded image' })
  deleteFile(@Param('filename') filename: string) {
    return this.uploadsService.deleteFile(filename);
  }
}
