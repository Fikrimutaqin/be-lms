import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestimoniesService } from './testimonies.service';
import { TestimoniesController } from './testimonies.controller';
import { Testimony } from './entities/testimony.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Testimony])],
  controllers: [TestimoniesController],
  providers: [TestimoniesService],
  exports: [TestimoniesService],
})
export class TestimoniesModule {}
