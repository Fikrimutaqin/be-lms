"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificatesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const certificates_service_1 = require("./certificates.service");
const create_certificate_dto_1 = require("./dto/create-certificate.dto");
const update_certificate_dto_1 = require("./dto/update-certificate.dto");
const certificate_entity_1 = require("./entities/certificate.entity");
let CertificatesController = class CertificatesController {
    certificatesService;
    constructor(certificatesService) {
        this.certificatesService = certificatesService;
    }
    create(createCertificateDto) {
        return this.certificatesService.create(createCertificateDto);
    }
    findAll() {
        return this.certificatesService.findAll();
    }
    findByUser(userId) {
        return this.certificatesService.findByUser(userId);
    }
    findOne(id) {
        return this.certificatesService.findOne(id);
    }
    update(id, updateCertificateDto) {
        return this.certificatesService.update(id, updateCertificateDto);
    }
    remove(id) {
        return this.certificatesService.remove(id);
    }
};
exports.CertificatesController = CertificatesController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Issue a new certificate' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: certificate_entity_1.Certificate }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Certificate already issued.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_certificate_dto_1.CreateCertificateDto]),
    __metadata("design:returntype", void 0)
], CertificatesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all certificates' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [certificate_entity_1.Certificate] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CertificatesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all certificates for a specific user' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [certificate_entity_1.Certificate] }),
    __param(0, (0, common_1.Param)('userId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CertificatesController.prototype, "findByUser", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a certificate by id' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: certificate_entity_1.Certificate }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Certificate not found.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CertificatesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a certificate' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: certificate_entity_1.Certificate }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_certificate_dto_1.UpdateCertificateDto]),
    __metadata("design:returntype", void 0)
], CertificatesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a certificate' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Certificate successfully deleted.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CertificatesController.prototype, "remove", null);
exports.CertificatesController = CertificatesController = __decorate([
    (0, swagger_1.ApiTags)('Certificates'),
    (0, common_1.Controller)('certificates'),
    __metadata("design:paramtypes", [certificates_service_1.CertificatesService])
], CertificatesController);
//# sourceMappingURL=certificates.controller.js.map