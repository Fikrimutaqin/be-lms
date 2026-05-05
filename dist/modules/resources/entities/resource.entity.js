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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resource = exports.ResourceType = void 0;
const typeorm_1 = require("typeorm");
const course_entity_1 = require("../../courses/entities/course.entity");
var ResourceType;
(function (ResourceType) {
    ResourceType["PDF"] = "pdf";
    ResourceType["VIDEO"] = "video";
    ResourceType["LINK"] = "link";
    ResourceType["DOCUMENT"] = "document";
    ResourceType["IMAGE"] = "image";
})(ResourceType || (exports.ResourceType = ResourceType = {}));
let Resource = class Resource {
    id;
    courseId;
    course;
    title;
    resourceUrl;
    resourceType;
    sequenceOrder;
    createdAt;
    updatedAt;
};
exports.Resource = Resource;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Resource.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'course_id' }),
    __metadata("design:type", String)
], Resource.prototype, "courseId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => course_entity_1.Course, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'course_id' }),
    __metadata("design:type", course_entity_1.Course)
], Resource.prototype, "course", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], Resource.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'resource_url', type: 'text' }),
    __metadata("design:type", String)
], Resource.prototype, "resourceUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'resource_type',
        type: 'varchar',
        length: 50,
    }),
    __metadata("design:type", String)
], Resource.prototype, "resourceType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sequence_order', type: 'integer' }),
    __metadata("design:type", Number)
], Resource.prototype, "sequenceOrder", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Resource.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Resource.prototype, "updatedAt", void 0);
exports.Resource = Resource = __decorate([
    (0, typeorm_1.Entity)('resources')
], Resource);
//# sourceMappingURL=resource.entity.js.map