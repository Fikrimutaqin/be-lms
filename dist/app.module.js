"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const users_module_1 = require("./modules/users/users.module");
const auth_module_1 = require("./modules/auth/auth.module");
const uploads_module_1 = require("./modules/uploads/uploads.module");
const courses_module_1 = require("./modules/courses/courses.module");
const categories_module_1 = require("./modules/categories/categories.module");
const enrollments_module_1 = require("./modules/enrollments/enrollments.module");
const course_modules_module_1 = require("./modules/course-modules/course-modules.module");
const lessons_module_1 = require("./modules/lessons/lessons.module");
const resources_module_1 = require("./modules/resources/resources.module");
const assignments_module_1 = require("./modules/assignments/assignments.module");
const submissions_module_1 = require("./modules/submissions/submissions.module");
const quizzes_module_1 = require("./modules/quizzes/quizzes.module");
const quiz_questions_module_1 = require("./modules/quiz-questions/quiz-questions.module");
const quiz_answers_module_1 = require("./modules/quiz-answers/quiz-answers.module");
const grades_module_1 = require("./modules/grades/grades.module");
const discussion_forums_module_1 = require("./modules/discussion-forums/discussion-forums.module");
const discussion_posts_module_1 = require("./modules/discussion-posts/discussion-posts.module");
const comments_module_1 = require("./modules/comments/comments.module");
const certificates_module_1 = require("./modules/certificates/certificates.module");
const notifications_module_1 = require("./modules/notifications/notifications.module");
const activity_logs_module_1 = require("./modules/activity-logs/activity-logs.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    type: 'postgres',
                    host: configService.get('DB_HOST'),
                    port: configService.get('DB_PORT'),
                    username: configService.get('DB_USERNAME'),
                    password: configService.get('DB_PASSWORD'),
                    database: configService.get('DB_DATABASE'),
                    entities: [__dirname + '/**/*.entity{.ts,.js}'],
                    synchronize: false,
                    migrations: [__dirname + '/database/migrations/*{.ts,.js}'],
                }),
                inject: [config_1.ConfigService],
            }),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            uploads_module_1.UploadsModule,
            courses_module_1.CoursesModule,
            categories_module_1.CategoriesModule,
            enrollments_module_1.EnrollmentsModule,
            course_modules_module_1.CourseModulesModule,
            lessons_module_1.LessonsModule,
            resources_module_1.ResourcesModule,
            assignments_module_1.AssignmentsModule,
            submissions_module_1.SubmissionsModule,
            quizzes_module_1.QuizzesModule,
            quiz_questions_module_1.QuizQuestionsModule,
            quiz_answers_module_1.QuizAnswersModule,
            grades_module_1.GradesModule,
            discussion_forums_module_1.DiscussionForumsModule,
            discussion_posts_module_1.DiscussionPostsModule,
            comments_module_1.CommentsModule,
            certificates_module_1.CertificatesModule,
            notifications_module_1.NotificationsModule,
            activity_logs_module_1.ActivityLogsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map