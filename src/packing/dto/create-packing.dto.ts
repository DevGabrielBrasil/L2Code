// src/packing/dto/create-packing.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, ValidateNested } from 'class-validator';

export class ProductDto {
  @ApiProperty({ example: 1, description: 'ID do Produto' })
  @IsNumber()
  id: number;

  @ApiProperty({ example: 10, description: 'Altura do produto em cm' })
  @IsNumber()
  altura: number;

  @ApiProperty({ example: 20, description: 'Largura do produto em cm' })
  @IsNumber()
  largura: number;

  @ApiProperty({ example: 30, description: 'Comprimento do produto em cm' })
  @IsNumber()
  comprimento: number;
}

export class OrderDto { // <-- Verifique se está exportado e com o nome correto
  @ApiProperty({ example: 101, description: 'ID do Pedido' })
  @IsNumber()
  pedido: number;

  @ApiProperty({ type: [ProductDto], description: 'Lista de produtos no pedido' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  produtos: ProductDto[];
}