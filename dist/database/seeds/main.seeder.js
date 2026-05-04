"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = __importStar(require("bcrypt"));
class MainSeeder {
    async run(dataSource, factoryManager) {
        const password = await bcrypt.hash('password123', 10);
        await dataSource.query(`
            INSERT INTO users (first_name, last_name, email, password, role) VALUES
            ('John', 'Instructor', 'john.instructor@lms.com', '${password}', 'instructor'),
            ('Jane', 'Student', 'jane.student@lms.com', '${password}', 'student'),
            ('Bob', 'Student', 'bob.student@lms.com', '${password}', 'student'),
            ('Admin', 'User', 'admin@lms.com', '${password}', 'admin')
            ON CONFLICT (email) DO NOTHING;
        `);
        await dataSource.query(`
            INSERT INTO courses (instructor_id, title, description, category, duration_hours) VALUES
            ((SELECT id FROM users WHERE email = 'john.instructor@lms.com'), 'Introduction to Web Development', 'Learn the fundamentals of web development', 'Technology', 40)
            ON CONFLICT DO NOTHING;
        `);
        console.log('Seeding completed! 🌱');
    }
}
exports.default = MainSeeder;
//# sourceMappingURL=main.seeder.js.map