import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from './entities/cart-item.entity';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { Course } from '../courses/entities/course.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async addToCart(userId: string, addToCartDto: AddToCartDto) {
    const { courseId } = addToCartDto;

    // Cek apakah course ada
    const course = await this.courseRepository.findOneBy({ id: courseId });
    if (!course) {
      throw new NotFoundException(`Course with ID ${courseId} not found`);
    }

    // Cek apakah sudah ada di cart
    const existingItem = await this.cartItemRepository.findOne({
      where: { userId, courseId },
    });
    if (existingItem) {
      throw new BadRequestException('This course is already in your cart');
    }

    const cartItem = this.cartItemRepository.create({
      userId,
      courseId,
    });

    return await this.cartItemRepository.save(cartItem);
  }

  async getCart(userId: string) {
    const items = await this.cartItemRepository.find({
      where: { userId },
      relations: ['course', 'course.instructor'],
    });

    // Hitung total harga
    const total = items.reduce((acc, item) => {
      // Asumsikan ada field price di course, jika tidak ada default 0
      const price = (item.course as any).price || 0;
      return acc + Number(price);
    }, 0);

    return {
      data: items,
      total,
    };
  }

  async removeFromCart(userId: string, itemId: string) {
    const cartItem = await this.cartItemRepository.findOne({
      where: { id: itemId, userId },
    });
    if (!cartItem) {
      throw new NotFoundException(`Cart item not found`);
    }
    return await this.cartItemRepository.remove(cartItem);
  }

  async clearCart(userId: string) {
    return await this.cartItemRepository.delete({ userId });
  }
}
