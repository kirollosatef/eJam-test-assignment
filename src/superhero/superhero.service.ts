import { Injectable } from '@nestjs/common';
import { Superhero } from './superhero.interface';
import { CreateSuperheroDto } from './dto/create-superhero.dto';
import { PaginationDto } from './dto/pagination.dto';
import { PaginatedResponseDto } from './dto/paginated-response.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SuperheroService {
  private superheroes: Superhero[] = [];

  create(createSuperheroDto: CreateSuperheroDto): Superhero {
    const superhero: Superhero = {
      id: uuidv4(),
      ...createSuperheroDto,
    };
    this.superheroes.push(superhero);
    return superhero;
  }

  findAll(paginationDto: PaginationDto): PaginatedResponseDto<Superhero> {
    const { page = 1, limit = 5 } = paginationDto;
    // console.log('🚀 ~ SuperheroService ~ findAll ~ limit:', limit);
    // console.log('🚀 ~ SuperheroService ~ findAll ~ page:', page);

    //! sort by score
    const sortedHeroes = [...this.superheroes].sort(
      (a, b) => b.humilityScore - a.humilityScore,
    );

    const startIndex: number = (page - 1) * limit;
    const endIndex: number = startIndex + limit;
    const total: number = sortedHeroes.length;
    const lastPage: number = Math.ceil(total / limit);

    const data = sortedHeroes.slice(startIndex, endIndex);
    // console.log("🚀 ~ SuperheroService ~ findAll ~ data:", data)

    return {
      data,
      meta: {
        total,
        page,
        lastPage,
        limit,
      },
    };
  }
}
