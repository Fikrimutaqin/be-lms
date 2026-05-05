"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddImageToCategories1714912300000 = void 0;
class AddImageToCategories1714912300000 {
    name = 'AddImageToCategories1714912300000';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE categories ADD COLUMN image TEXT`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE categories DROP COLUMN image`);
    }
}
exports.AddImageToCategories1714912300000 = AddImageToCategories1714912300000;
//# sourceMappingURL=1714912300000-AddImageToCategories.js.map