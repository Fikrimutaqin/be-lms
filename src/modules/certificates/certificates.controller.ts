import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CertificatesService } from './certificates.service';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';
import { Certificate } from './entities/certificate.entity';

@ApiTags('Certificates')
@Controller('certificates')
export class CertificatesController {
  constructor(private readonly certificatesService: CertificatesService) { }

  @Post()
  @ApiOperation({ summary: 'Issue a new certificate' })
  @ApiResponse({ status: 201, type: Certificate })
  @ApiResponse({ status: 409, description: 'Certificate already issued.' })
  create(@Body() createCertificateDto: CreateCertificateDto) {
    return this.certificatesService.create(createCertificateDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all certificates' })
  @ApiResponse({ status: 200, type: [Certificate] })
  findAll() {
    return this.certificatesService.findAll();
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all certificates for a specific user' })
  @ApiResponse({ status: 200, type: [Certificate] })
  findByUser(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.certificatesService.findByUser(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a certificate by id' })
  @ApiResponse({ status: 200, type: Certificate })
  @ApiResponse({ status: 404, description: 'Certificate not found.' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.certificatesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a certificate' })
  @ApiResponse({ status: 200, type: Certificate })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateCertificateDto: UpdateCertificateDto) {
    return this.certificatesService.update(id, updateCertificateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a certificate' })
  @ApiResponse({ status: 204, description: 'Certificate successfully deleted.' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.certificatesService.remove(id);
  }
}
