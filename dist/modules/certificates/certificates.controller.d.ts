import { CertificatesService } from './certificates.service';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';
import { Certificate } from './entities/certificate.entity';
export declare class CertificatesController {
    private readonly certificatesService;
    constructor(certificatesService: CertificatesService);
    create(createCertificateDto: CreateCertificateDto): Promise<Certificate>;
    findAll(): Promise<Certificate[]>;
    findByUser(userId: string): Promise<Certificate[]>;
    findOne(id: string): Promise<Certificate>;
    update(id: string, updateCertificateDto: UpdateCertificateDto): Promise<Certificate>;
    remove(id: string): Promise<void>;
}
