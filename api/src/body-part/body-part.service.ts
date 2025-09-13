import { Injectable } from '@nestjs/common';
import { CreateBodyPartDto } from './dto/create-body-part.dto';
import { UpdateBodyPartDto } from './dto/update-body-part.dto';

@Injectable()
export class BodyPartService {
  create(createBodyPartDto: CreateBodyPartDto) {
    return 'This action adds a new bodyPart';
  }

  findAll() {
    return `This action returns all bodyPart`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bodyPart`;
  }

  update(id: number, updateBodyPartDto: UpdateBodyPartDto) {
    return `This action updates a #${id} bodyPart`;
  }

  remove(id: number) {
    return `This action removes a #${id} bodyPart`;
  }
}
