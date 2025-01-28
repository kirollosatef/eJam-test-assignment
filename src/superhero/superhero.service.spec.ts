import { Test, TestingModule } from '@nestjs/testing';
import { SuperheroService } from './superhero.service';
import { CreateSuperheroDto } from './dto/create-superhero.dto';
import { PaginationDto } from './dto/pagination.dto';

describe('SuperheroService', () => {
  let service: SuperheroService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuperheroService],
    }).compile();

    service = module.get<SuperheroService>(SuperheroService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new superhero', () => {
      const createSuperheroDto: CreateSuperheroDto = {
        name: 'Test Hero',
        superpower: 'Test Power',
        humilityScore: 8,
      };

      const result = service.create(createSuperheroDto);

      expect(result).toEqual({
        id: expect.any(String),
        ...createSuperheroDto,
      });
    });
  });

  describe('findAll', () => {
    beforeEach(() => {
      const heroes = [
        { name: 'Hero 1', superpower: 'Power 1', humilityScore: 5 },
        { name: 'Hero 2', superpower: 'Power 2', humilityScore: 8 },
        { name: 'Hero 3', superpower: 'Power 3', humilityScore: 3 },
      ];

      heroes.forEach((hero) => service.create(hero));
    });

    it('should return paginated superheroes sorted by humility score', () => {
      const paginationDto: PaginationDto = { page: 1, limit: 2 };

      const result = service.findAll(paginationDto);

      expect(result.data).toHaveLength(2);
      expect(result.data[0].humilityScore).toBe(8);
      expect(result.meta).toEqual({
        total: 3,
        page: 1,
        lastPage: 2,
        limit: 2,
      });
    });

    it('should handle empty pages correctly', () => {
      const paginationDto: PaginationDto = { page: 3, limit: 2 };

      const result = service.findAll(paginationDto);

      expect(result.data).toHaveLength(0);
      expect(result.meta.total).toBe(3);
    });

    it('should use default pagination values', () => {
      const result = service.findAll({ page: 1, limit: 10 });

      expect(result.meta).toEqual({
        total: 3,
        page: 1,
        lastPage: 1,
        limit: 10,
      });
    });
  });
});
