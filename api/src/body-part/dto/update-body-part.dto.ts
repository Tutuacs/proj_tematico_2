import { PartialType } from '@nestjs/swagger';
import { CreateBodyPartDto } from './create-body-part.dto';

export class UpdateBodyPartDto extends PartialType(CreateBodyPartDto) {}
