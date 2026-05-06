import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CertificatesService } from './certificates.service';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';
import { Certificate } from './entities/certificate.entity';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@ApiTags('Certificates')
@ApiBearerAuth()
@Controller('certificates')
export class CertificatesController {
  constructor(private readonly certificatesService: CertificatesService) { }

  /**
   * Menerbitkan sertifikat baru untuk siswa.
   * Hanya boleh dilakukan oleh Instruktur atau Admin setelah siswa menyelesaikan kursus.
   */
  @Post()
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  @ApiOperation({ summary: 'Issue a new certificate' })
  @ApiResponse({ status: 201, type: Certificate })
  create(@Body() createCertificateDto: CreateCertificateDto) {
    return this.certificatesService.create(createCertificateDto);
  }

  /**
   * Mengambil semua daftar sertifikat yang pernah diterbitkan (Hanya Admin).
   */
  @Get()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get all certificates' })
  @ApiResponse({ status: 200, type: [Certificate] })
  findAll() {
    return this.certificatesService.findAll();
  }

  /**
   * Mengambil semua koleksi sertifikat milik user tertentu.
   * Digunakan untuk menampilkan pencapaian di profil siswa.
   */
  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all certificates for a specific user' })
  @ApiResponse({ status: 200, type: [Certificate] })
  findByUser(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.certificatesService.findByUser(userId);
  }

  /**
   * Mengambil detail sertifikat berdasarkan ID.
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get a certificate by id' })
  @ApiResponse({ status: 200, type: Certificate })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.certificatesService.findOne(id);
  }

  /**
   * Memperbarui data sertifikat (misal: link file atau metadata).
   */
  @Patch(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Update a certificate' })
  @ApiResponse({ status: 200, type: Certificate })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateCertificateDto: UpdateCertificateDto) {
    return this.certificatesService.update(id, updateCertificateDto);
  }

  /**
   * Menghapus sertifikat.
   */
  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete a certificate' })
  @ApiResponse({ status: 204, description: 'Certificate successfully deleted.' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.certificatesService.remove(id);
  }
}
