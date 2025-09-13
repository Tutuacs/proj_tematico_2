import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BodyPartService } from './body-part.service';
import { CreateBodyPartDto } from './dto/create-body-part.dto';
import { UpdateBodyPartDto } from './dto/update-body-part.dto';

@Controller('body-part')
export class BodyPartController {
  constructor(private readonly bodyPartService: BodyPartService) {}

  @Post()
  create(@Body() createBodyPartDto: CreateBodyPartDto) {
    return this.bodyPartService.create(createBodyPartDto);
  }

  @Get()
  findAll() {
    return this.bodyPartService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bodyPartService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBodyPartDto: UpdateBodyPartDto) {
    return this.bodyPartService.update(+id, updateBodyPartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bodyPartService.remove(+id);
  }
}
