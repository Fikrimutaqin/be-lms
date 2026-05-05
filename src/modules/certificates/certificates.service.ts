import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Certificate } from './entities/certificate.entity';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';

@Injectable()
export class CertificatesService {
  constructor(
    @InjectRepository(Certificate)
    private readonly certificateRepository: Repository<Certificate>,
  ) {}

  async create(createCertificateDto: CreateCertificateDto): Promise<Certificate> {
    const { userId, courseId } = createCertificateDto;

    const existing = await this.certificateRepository.findOne({
      where: { userId, courseId },
    });

    if (existing) {
      throw new ConflictException('Certificate already exists for this user and course');
    }

    const certificate = this.certificateRepository.create(createCertificateDto);
    return await this.certificateRepository.save(certificate);
  }

  async findAll(): Promise<Certificate[]> {
    return await this.certificateRepository.find({
      relations: ['user', 'course'],
    });
  }

  async findByUser(userId: string): Promise<Certificate[]> {
    return await this.certificateRepository.find({
      where: { userId },
      relations: ['course'],
      order: { earnedAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Certificate> {
    const certificate = await this.certificateRepository.findOne({
      where: { id },
      relations: ['user', 'course'],
    });

    if (!certificate) {
      throw new NotFoundException(`Certificate with ID "${id}" not found`);
    }

    return certificate;
  }

  async update(id: string, updateCertificateDto: UpdateCertificateDto): Promise<Certificate> {
    const certificate = await this.findOne(id);
    const updatedCertificate = this.certificateRepository.merge(certificate, updateCertificateDto);
    return await this.certificateRepository.save(updatedCertificate);
  }

  async remove(id: string): Promise<void> {
    const certificate = await this.findOne(id);
    await this.certificateRepository.remove(certificate);
  }
}
