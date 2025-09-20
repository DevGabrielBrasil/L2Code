import { Test, TestingModule } from '@nestjs/testing';
import { PackingService } from './packing.service';

describe('PackingService', () => {
  let service: PackingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PackingService],
    }).compile();

    service = module.get<PackingService>(PackingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
