import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { RolesGuard } from './common/guards/roles.guard';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { UploadsModule } from './modules/uploads/uploads.module';
import { CoursesModule } from './modules/courses/courses.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { EnrollmentsModule } from './modules/enrollments/enrollments.module';
import { CourseModulesModule } from './modules/course-modules/course-modules.module';
import { LessonsModule } from './modules/lessons/lessons.module';
import { ResourcesModule } from './modules/resources/resources.module';
import { AssignmentsModule } from './modules/assignments/assignments.module';
import { SubmissionsModule } from './modules/submissions/submissions.module';
import { QuizzesModule } from './modules/quizzes/quizzes.module';
import { QuizQuestionsModule } from './modules/quiz-questions/quiz-questions.module';
import { QuizAnswersModule } from './modules/quiz-answers/quiz-answers.module';
import { GradesModule } from './modules/grades/grades.module';
import { DiscussionForumsModule } from './modules/discussion-forums/discussion-forums.module';
import { DiscussionPostsModule } from './modules/discussion-posts/discussion-posts.module';
import { CommentsModule } from './modules/comments/comments.module';
import { CertificatesModule } from './modules/certificates/certificates.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { ActivityLogsModule } from './modules/activity-logs/activity-logs.module';
import { SearchModule } from './modules/search/search.module';
import { TestimoniesModule } from './modules/testimonies/testimonies.module';
import { CartModule } from './modules/cart/cart.module';
import { OrdersModule } from './modules/orders/orders.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10,
    }]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const databaseUrl = configService.get<string>('DATABASE_URL');
        
        return {
          type: 'postgres',
          // Jika ada DATABASE_URL (seperti di Neon/Heroku), gunakan itu. 
          // Jika tidak ada, gunakan konfigurasi individual.
          url: databaseUrl,
          host: databaseUrl ? undefined : configService.get<string>('DB_HOST'),
          port: databaseUrl ? undefined : configService.get<number>('DB_PORT'),
          username: databaseUrl ? undefined : configService.get<string>('DB_USERNAME'),
          password: databaseUrl ? undefined : configService.get<string>('DB_PASSWORD'),
          database: databaseUrl ? undefined : configService.get<string>('DB_DATABASE'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: false, // Diset false demi keamanan data (gunakan migrasi)
          
          // Konfigurasi SSL untuk Neon atau Cloud Database lainnya
          ssl: databaseUrl || configService.get<string>('DB_SSL') === 'true' 
            ? { rejectUnauthorized: false } 
            : false,
          
          migrations: [__dirname + '/database/migrations/*{.ts,.js}'],
        };
      },
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    UploadsModule,
    CoursesModule,
    CategoriesModule,
    EnrollmentsModule,
    CourseModulesModule,
    LessonsModule,
    ResourcesModule,
    AssignmentsModule,
    SubmissionsModule,
    QuizzesModule,
    QuizQuestionsModule,
    QuizAnswersModule,
    GradesModule,
    DiscussionForumsModule,
    DiscussionPostsModule,
    CommentsModule,
    CertificatesModule,
    NotificationsModule,
    ActivityLogsModule,
    SearchModule,
    TestimoniesModule,
    CartModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
