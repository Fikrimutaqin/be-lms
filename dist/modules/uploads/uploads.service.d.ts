export declare class UploadsService {
    private readonly uploadPath;
    constructor();
    private ensureUploadPathExists;
    formatFileUrl(filename: string): string;
    deleteFile(filename: string): Promise<{
        message: string;
    }>;
}
