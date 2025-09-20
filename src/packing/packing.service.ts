import { Injectable } from '@nestjs/common';
import { OrderDto, ProductDto } from './dto/create-packing.dto';

// Tipos para ajudar na clareza do código
type BoxDimensions = {
  nome: string;
  altura: number;
  largura: number;
  comprimento: number;
  volume: number;
};

type UsedBox = {
  caixa: string;
  produtos: { id: number }[];
  // Guarda as dimensões da caixa para não precisar procurar de novo
  dimensoes: BoxDimensions; 
};

@Injectable()
export class PackingService {
  // Caixas ordenadas da menor para a maior em volume. Facilita na hora de escolher.
  private readonly availableBoxes: BoxDimensions[] = [
    { nome: 'Caixa 1', altura: 30, largura: 40, comprimento: 80, volume: 96000 },
    { nome: 'Caixa 2', altura: 50, largura: 50, comprimento: 40, volume: 100000 },
    { nome: 'Caixa 3', altura: 50, largura: 80, comprimento: 60, volume: 240000 },
  ].sort((a, b) => a.volume - b.volume);

  processOrders(orders: OrderDto[]) {
    const finalResult: any[] = [];

    for (const order of orders) {
      // Estratégia: First Fit Decreasing. Ordena os produtos do maior para o menor.
      // Isso otimiza o empacotamento, colocando os itens grandes primeiro.
      const sortedProducts = [...order.produtos].sort((a, b) => {
        const volumeA = a.altura * a.largura * a.comprimento;
        const volumeB = b.altura * b.largura * b.comprimento;
        return volumeB - volumeA;
      });

      const usedBoxesForThisOrder: UsedBox[] = [];

      for (const product of sortedProducts) {
        let isPacked = false;

        // Tenta encaixar em alguma caixa já em uso
        for (const usedBox of usedBoxesForThisOrder) {
          if (this.productFitsInBox(product, usedBox.dimensoes)) {
            usedBox.produtos.push({ id: product.id });
            isPacked = true;
            break; // Achou lugar, vai para o próximo produto.
          }
        }

        // Se não coube em nenhuma, procura a melhor caixa nova para ele
        if (!isPacked) {
          const smallestNewBox = this.findSmallestBoxForProduct(product);
          if (smallestNewBox) {
            usedBoxesForThisOrder.push({
              caixa: smallestNewBox.nome,
              produtos: [{ id: product.id }],
              dimensoes: smallestNewBox,
            });
          } else {
            // TODO: Tratar produtos que não cabem em nenhuma caixa. Por agora, apenas logamos.
            console.warn(`Produto ${product.id} (pedido ${order.pedido}) não coube em nenhuma caixa.`);
          }
        }
      }

      // Formata a saída para o padrão do JSON final, removendo dados internos como 'dimensoes'.
      const finalPackedBoxes = usedBoxesForThisOrder.map(box => ({
        caixa: box.caixa,
        produtos: box.produtos,
      }));

      finalResult.push({
        pedido: order.pedido,
        caixas: finalPackedBoxes,
      });
    }

    return finalResult;
  }

  // Procura na lista de caixas disponíveis a menor (primeira da lista ordenada) que comporte o produto.
  private findSmallestBoxForProduct(product: ProductDto): BoxDimensions | null {
    for (const box of this.availableBoxes) {
      if (this.productFitsInBox(product, box)) {
        return box;
      }
    }
    return null;
  }

  // Verifica se um produto cabe em uma caixa, testando todas as 6 rotações possíveis.
  private productFitsInBox(product: ProductDto, box: BoxDimensions): boolean {
    const { altura: pA, largura: pL, comprimento: pC } = product;
    const { altura: cA, largura: cL, comprimento: cC } = box;
    
    return (
      (pA <= cA && pL <= cL && pC <= cC) ||
      (pA <= cA && pC <= cL && pL <= cC) ||
      (pL <= cA && pA <= cL && pC <= cC) ||
      (pL <= cA && pC <= cL && pA <= cC) ||
      (pC <= cA && pA <= cL && pL <= cC) ||
      (pC <= cA && pL <= cL && pA <= cC)
    );
  }
}