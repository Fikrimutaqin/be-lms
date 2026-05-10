import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { GetUser } from '../../common/decorators/get-user.decorator';

@ApiTags('Cart')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @ApiOperation({ summary: 'Add a course to cart' })
  @ApiResponse({ status: 201, description: 'Course added to cart.' })
  addToCart(@GetUser('id') userId: string, @Body() addToCartDto: AddToCartDto) {
    return this.cartService.addToCart(userId, addToCartDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get current user cart' })
  @ApiResponse({ status: 200, description: 'Return cart items.' })
  getCart(@GetUser('id') userId: string) {
    return this.cartService.getCart(userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove an item from cart' })
  @ApiResponse({ status: 200, description: 'Item removed from cart.' })
  removeFromCart(@GetUser('id') userId: string, @Param('id') itemId: string) {
    return this.cartService.removeFromCart(userId, itemId);
  }

  @Delete('clear')
  @ApiOperation({ summary: 'Clear cart' })
  @ApiResponse({ status: 200, description: 'Cart cleared.' })
  clearCart(@GetUser('id') userId: string) {
    return this.cartService.clearCart(userId);
  }
}
