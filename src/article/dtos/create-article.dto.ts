import { IsNotEmpty } from 'class-validator';

export class CreateArticleDto {
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly content: string;

  createdTime?: string;

  updatedTime?: string;

  readonly categories?: string[];

  readonly tags: string[];
}
