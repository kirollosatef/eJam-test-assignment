import { IsString, IsInt, Min, Max, IsNotEmpty } from 'class-validator';

export class CreateSuperheroDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  superpower: string;

  @IsInt()
  @Min(0)
  @Max(10)
  @IsNotEmpty()
  humilityScore: number;
}
