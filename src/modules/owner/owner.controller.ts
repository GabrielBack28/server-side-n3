import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { OwnerService } from './owner.service';
import { Owner } from 'src/entity/owner.entity';
import { AuthGuard } from 'src/core/guard/auth.guard';

@Controller('owner')
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

  @Get()
  findAll(@Query() query: Owner) {
    return this.ownerService.findAll(query);
  }

  @Get('vehicles')
  findAllWithVehicles() {
    return this.ownerService.findAllWithVehicles();
  }

  @Get(':id')
  findOneById(@Param('id') id: number) {
    return this.ownerService.findOneById(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() owner: Owner) {
    return this.ownerService.create(owner);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  update(@Param('id') id: number, @Body() owner: Owner) {
    return this.ownerService.update(id, owner);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.ownerService.delete(id);
  }
}
