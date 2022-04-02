import { Test, TestingModule } from '@nestjs/testing';
import { WordleService } from './wordle.service';

describe('QuoteService', () => {
  let service: WordleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WordleService],
    }).compile();

    service = module.get<WordleService>(WordleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
