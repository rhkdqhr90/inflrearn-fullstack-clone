import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCourseDto {
  @ApiProperty({ description: '코스제목' })
  @IsString()
  title: string;
}
