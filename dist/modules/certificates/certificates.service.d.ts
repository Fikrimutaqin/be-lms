import { Repository } from 'typeorm';
import { Certificate } from './entities/certificate.entity';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';
export declare class CertificatesService {
    private readonly certificateRepository;
    constructor(certificateRepository: Repository<Certificate>);
    create(createCertificateDto: CreateCertificateDto): Promise<Certificate>;
    findAll(): Promise<Certificate[]>;
    findByUser(userId: string): Promise<Certificate[]>;
    findOne(id: string): Promise<Certificate>;
    update(id: string, updateCertificateDto: UpdateCertificateDto): Promise<Certificate>;
    remove(id: string): Promise<void>;
}
