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

  async create(createResourceDto: CreateResourceDto): Promise<Resource> {
    const resource = this.resourceRepository.create(createResourceDto);
    return await this.resourceRepository.save(resource);
  }

  async findAll(): Promise<Resource[]> {
    return await this.resourceRepository.find({
      order: { sequenceOrder: 'ASC' },
    });
  }

  async findByCourse(courseId: string): Promise<Resource[]> {
    return await this.resourceRepository.find({
      where: { courseId },
      order: { sequenceOrder: 'ASC' },
    });
  }

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

  async update(id: string, updateResourceDto: UpdateResourceDto): Promise<Resource> {
    const resource = await this.findOne(id);
    const updatedResource = this.resourceRepository.merge(resource, updateResourceDto);
    return await this.resourceRepository.save(updatedResource);
  }

  async remove(id: string): Promise<void> {
    const resource = await this.findOne(id);
    await this.resourceRepository.remove(resource);
  }
}
