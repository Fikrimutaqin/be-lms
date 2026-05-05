import { ResourcesService } from './resources.service';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { Resource } from './entities/resource.entity';
export declare class ResourcesController {
    private readonly resourcesService;
    constructor(resourcesService: ResourcesService);
    create(createResourceDto: CreateResourceDto): Promise<Resource>;
    findAll(): Promise<Resource[]>;
    findByCourse(courseId: string): Promise<Resource[]>;
    findOne(id: string): Promise<Resource>;
    update(id: string, updateResourceDto: UpdateResourceDto): Promise<Resource>;
    remove(id: string): Promise<void>;
}
