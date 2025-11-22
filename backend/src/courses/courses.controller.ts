import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  Req,
  UseGuards,
  Patch,
  Delete,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/auth/guards/access-token-guard';
import { CreateCourseDto } from './dto/create-course.dto';
import { Request } from 'express';
import { Prisma } from '@prisma/client';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course as CourseEntity } from 'src/_gen/prisma-class/course';

@ApiTags('코스')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('access-token')
  @ApiOkResponse({
    description: '코스 생성',
    type: CourseEntity,
  })
  create(@Req() req: Request, @Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(req.user!.sub, createCourseDto);
  }

  @Get()
  @ApiQuery({ name: 'title', required: false })
  @ApiQuery({ name: 'level', required: false })
  @ApiQuery({ name: 'categoryId', required: false })
  @ApiQuery({ name: 'skip', required: false })
  @ApiQuery({ name: 'take', required: false })
  @ApiOkResponse({
    description: '코스목록',
    type: CourseEntity,
    isArray: true,
  })
  findAll(
    @Query('title') title?: string,
    @Query('level') level?: string,
    @Query('categoryId') categoryId?: string,
    @Query('skip') skip?: string,
    @Query('take') take?: string,
  ) {
    const where: Prisma.CourseWhereInput = {};
    if (title) {
      where.title = { contains: title, mode: 'insensitive' };
    }

    if (level) {
      where.level = level;
    }

    if (categoryId) {
      where.categories = {
        some: {
          id: categoryId,
        },
      };
    }
    return this.coursesService.findAll({
      where,
      skip: skip ? parseInt(skip) : undefined,
      take: take ? parseInt(take) : undefined,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  @Get(':id')
  @ApiQuery({
    name: 'include',
    required: false,
    description: ' section, lectures, courseReviews 등 포함할 관계지정',
  })
  @ApiOkResponse({
    description: '코스 상세 정보',
    type: CourseEntity,
  })
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('include') include?: string,
  ) {
    const includeArray = include?.split(',').map((s) => s.trim()) ?? [];

    const includeObject: Prisma.CourseInclude = {};

    const wantsSections = includeArray.includes('sections');
    const wantsLectures = includeArray.includes('lectures');

    // lectures를 요청하면 sections를 통해 접근해야 함
    if (wantsLectures) {
      includeObject.sections = { include: { lectures: true } };
    } else if (wantsSections) {
      includeObject.sections = true;
    }

    // 일반 relation 자동 처리
    const ALLOWED_RELATIONS: (keyof Prisma.CourseInclude)[] = [
      'instructor',
      'sections',
      'categories',
      'enrollments',
      'reviews',
      'questions',
    ];

    for (const relation of includeArray) {
      if (relation === 'sections' || relation === 'lectures') continue;
      const relationKey = relation as keyof Prisma.CourseInclude;
      if (!ALLOWED_RELATIONS.includes(relationKey)) continue;

      includeObject[relationKey] = true;
    }

    return this.coursesService.findOne(
      id,
      Object.keys(includeObject).length > 0 ? includeObject : undefined,
    );
  }

  @Patch(':id')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('access-token')
  @ApiOkResponse({
    description: '코드 수정',
    type: CourseEntity,
  })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req: Request,
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    return this.coursesService.update(id, req.user!.sub, updateCourseDto);
  }

  @Delete(':id')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('access-token')
  @ApiOkResponse({
    description: '코스 삭제',
    type: CourseEntity,
  })
  dlelete(@Param('id', ParseUUIDPipe) id: string, @Req() req: Request) {
    return this.coursesService.delete(id, req.user!.sub);
  }
}
