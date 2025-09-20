// src/packing/packing.controller.ts
import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { PackingService } from './packing.service';
import { OrderDto } from './dto/create-packing.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('packing')
@Controller('packing')
export class PackingController {
  constructor(private readonly packingService: PackingService) {}

  @Post('pack')
  @ApiOperation({ summary: 'Processa uma lista de pedidos para empacotamento' })
  @ApiResponse({ status: 200, description: 'Pedidos processados com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados de entrada inválidos.' })
  packOrders(@Body(new ValidationPipe()) orders: OrderDto[]) {
    return this.packingService.processOrders(orders);
  }
}