import { Test, TestingModule } from '@nestjs/testing';
import { SuperheroController } from './superhero.controller';
import { SuperheroService } from './superhero.service';
import { CreateSuperheroDto } from './dto/create-superhero.dto';
import { PaginationDto } from './dto/pagination.dto';

describe('SuperheroController', () => {
  let controller: SuperheroController;
  let service: SuperheroService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuperheroController],
      providers: [SuperheroService],
    }).compile();

    controller = module.get<SuperheroController>(SuperheroController);
    service = module.get<SuperheroService>(SuperheroService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a superhero', () => {
      const createSuperheroDto: CreateSuperheroDto = {
        name: 'Test Hero',
        superpower: 'Test Power',
        humilityScore: 7,
      };

      const result = controller.create(createSuperheroDto);

      expect(result).toEqual({
        id: expect.any(String),
        ...createSuperheroDto,
      });
    });
  });

  describe('findAll', () => {
    beforeEach(() => {
      // Add test data
      const heroes = [
        { name: 'Hero 1', superpower: 'Power 1', humilityScore: 5 },
        { name: 'Hero 2', superpower: 'Power 2', humilityScore: 8 },
      ];

      heroes.forEach((hero) => service.create(hero));
    });

    it('should return paginated superheroes', () => {
      const paginationDto: PaginationDto = { page: 1, limit: 2 };

      const result = controller.findAll(paginationDto);

      expect(result.data).toHaveLength(2);
      expect(result.meta).toEqual({
        total: 2,
        page: 1,
        lastPage: 1,
        limit: 2,
      });
    });
  });
});
