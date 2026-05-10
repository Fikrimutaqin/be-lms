import { Controller, Get, Post, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { GetUser } from '../../common/decorators/get-user.decorator';

@ApiTags('Orders')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('checkout')
  @ApiOperation({ summary: 'Create an order from cart (Checkout)' })
  @ApiResponse({ status: 201, description: 'Order created successfully.' })
  checkout(@GetUser('id') userId: string) {
    return this.ordersService.checkout(userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get my orders' })
  @ApiResponse({ status: 200, description: 'Return my orders.' })
  getMyOrders(@GetUser('id') userId: string) {
    return this.ordersService.getMyOrders(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order by id' })
  @ApiResponse({ status: 200, description: 'Return order detail.' })
  getOrderById(@GetUser('id') userId: string, @Param('id') id: string) {
    return this.ordersService.getOrderById(userId, id);
  }
}
