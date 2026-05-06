import { UploadsService } from './uploads.service';
export declare class UploadsController {
    private readonly uploadsService;
    constructor(uploadsService: UploadsService);
    uploadFile(file: Express.Multer.File): {
        message: string;
        data: {
            url: string;
            filename: string;
        };
    };
    deleteFile(filename: string): Promise<{
        message: string;
    }>;
}
