import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resource } from './entities/resource.entity';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';

@Injectable()
export class ResourcesService {
  constructor(
    @InjectRepository(Resource)
    private readonly resourceRepository: Repository<Resource>,
  ) {}

  /**
   * Menambahkan resource baru.
   */
  async create(createResourceDto: CreateResourceDto): Promise<Resource> {
    const resource = this.resourceRepository.create(createResourceDto);
    return await this.resourceRepository.save(resource);
  }

  /**
   * Mengambil semua daftar resource.
   */
  async findAll() {
    const resources = await this.resourceRepository.find({
      order: { sequenceOrder: 'ASC' },
    });
    return {
      message: 'All resources retrieved successfully',
      data: resources
    };
  }

  /**
   * Mengambil semua resource milik kursus tertentu.
   */
  async findByCourse(courseId: string) {
    const resources = await this.resourceRepository.find({
      where: { courseId },
      order: { sequenceOrder: 'ASC' },
    });
    return {
      message: 'Resources for the course retrieved successfully',
      data: resources
    };
  }

  /**
   * Mencari detail satu resource.
   */
  async findOne(id: string): Promise<Resource> {
    const resource = await this.resourceRepository.findOne({
      where: { id },
      relations: ['course'],
    });

    if (!resource) {
      throw new NotFoundException(`Resource with ID "${id}" not found`);
    }

    return resource;
  }

  /**
   * Memperbarui data resource.
   */
  async update(id: string, updateResourceDto: UpdateResourceDto): Promise<Resource> {
    const resource = await this.findOne(id);
    const updatedResource = this.resourceRepository.merge(resource, updateResourceDto);
    return await this.resourceRepository.save(updatedResource);
  }

  /**
   * Menghapus resource.
   */
  async remove(id: string): Promise<void> {
    const resource = await this.findOne(id);
    await this.resourceRepository.remove(resource);
  }
}
