import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { SuperheroService } from './superhero.service';
import { CreateSuperheroDto } from './dto/create-superhero.dto';
import { PaginationDto } from './dto/pagination.dto';
import { Superhero } from './superhero.interface';
import { PaginatedResponseDto } from './dto/paginated-response.dto';

@Controller('superheroes')
export class SuperheroController {
  constructor(private readonly superheroService: SuperheroService) {}

  @Post()
  create(@Body() createSuperheroDto: CreateSuperheroDto): Superhero {
    return this.superheroService.create(createSuperheroDto);
  }

  @Get()
  findAll(
    @Query() paginationDto: PaginationDto,
  ): PaginatedResponseDto<Superhero> {
    return this.superheroService.findAll(paginationDto);
  }
}
