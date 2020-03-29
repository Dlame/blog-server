import { IsNotEmpty, IsInt, IsOptional, IsArray, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class GetArticleDto {
  @Type(() => Number)
  @IsNotEmpty()
  @IsInt()
  page: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  size?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  keyword?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  tag?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  category?: string;
}
