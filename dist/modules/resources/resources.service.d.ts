import { Repository } from 'typeorm';
import { Resource } from './entities/resource.entity';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
export declare class ResourcesService {
    private readonly resourceRepository;
    constructor(resourceRepository: Repository<Resource>);
    create(createResourceDto: CreateResourceDto): Promise<Resource>;
    findAll(): Promise<Resource[]>;
    findByCourse(courseId: string): Promise<Resource[]>;
    findOne(id: string): Promise<Resource>;
    update(id: string, updateResourceDto: UpdateResourceDto): Promise<Resource>;
    remove(id: string): Promise<void>;
}
