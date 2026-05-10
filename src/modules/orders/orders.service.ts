import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Order, OrderStatus } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { CartService } from '../cart/cart.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly cartService: CartService,
    private readonly dataSource: DataSource, // Untuk transaksi
  ) {}

  async checkout(userId: string) {
    const cart = await this.cartService.getCart(userId);
    
    if (cart.data.length === 0) {
      throw new BadRequestException('Your cart is empty');
    }

    // Gunakan transaksi database agar konsisten
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 1. Buat Order
      const order = queryRunner.manager.create(Order, {
        userId,
        totalAmount: cart.total,
        status: OrderStatus.PENDING,
      });
      const savedOrder = await queryRunner.manager.save(order);

      // 2. Buat Order Items
      const orderItems = cart.data.map((cartItem) => {
        const price = (cartItem.course as any).price || 0;
        return queryRunner.manager.create(OrderItem, {
          orderId: savedOrder.id,
          courseId: cartItem.courseId,
          price: price,
        });
      });
      await queryRunner.manager.save(OrderItem, orderItems);

      // 3. Kosongkan Cart
      await this.cartService.clearCart(userId);

      await queryRunner.commitTransaction();

      return {
        message: 'Order created successfully',
        data: {
          orderId: savedOrder.id,
          totalAmount: savedOrder.totalAmount,
          status: savedOrder.status,
          items: orderItems.map(item => ({ courseId: item.courseId, price: item.price })),
        },
      };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async getMyOrders(userId: string) {
    return await this.orderRepository.find({
      where: { userId },
      relations: ['items', 'items.course'],
      order: { createdAt: 'DESC' },
    });
  }

  async getOrderById(userId: string, orderId: string) {
    const order = await this.orderRepository.findOne({
      where: { id: orderId, userId },
      relations: ['items', 'items.course'],
    });

    if (!order) {
      throw new NotFoundException(`Order not found`);
    }

    return order;
  }
}
