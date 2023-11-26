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
import { VehicleService } from './vehicle.service';
import { Vehicle } from 'src/entity/vehicle.entity';
import { AuthGuard } from 'src/core/guard/auth.guard';

@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Get()
  findAll(@Query() query: Vehicle) {
    return this.vehicleService.findAll(query);
  }

  @Get('owner/:id')
  findAllByOwnerId(@Param('id') id: number) {
    return this.vehicleService.findAllByOwnerId(id);
  }

  @Get(':id')
  findOneById(@Param('id') id: number) {
    return this.vehicleService.findOneById(id);
  }

  @Get(':plate/plate')
  findByModel(@Param('plate') plate: string) {
    return this.vehicleService.findByPlate(plate);
  }

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() vehicle: Vehicle) {
    return this.vehicleService.create(vehicle);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  update(@Param('id') id: number, @Body() vehicle: Vehicle) {
    return this.vehicleService.update(id, vehicle);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.vehicleService.delete(id);
  }
}
