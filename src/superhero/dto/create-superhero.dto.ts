import { IsString, IsInt, Min, Max } from 'class-validator';

export class CreateSuperheroDto {
  @IsString()
  name: string;

  @IsString()
  superpower: string;

  @IsInt()
  @Min(0)
  @Max(10)
  humilityScore: number;
}