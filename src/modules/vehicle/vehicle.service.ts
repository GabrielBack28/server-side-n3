import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle, VehicleType } from 'src/entity/vehicle.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
  ) {}

  findAll(query?: Vehicle): Promise<Vehicle[]> {
    return this.vehicleRepository.find({
      where: query,
    });
  }

  findAllByOwnerId(id: number): Promise<Vehicle[]> {
    return this.vehicleRepository.find({
      where: {
        owner: {
          id,
        },
      },
    });
  }

  findOneById(id: number): Promise<Vehicle> {
    return this.vehicleRepository.findOne({
      where: {
        id,
      },
    });
  }

  findByPlate(plate: string): Promise<Vehicle> {
    return this.vehicleRepository.findOne({
      where: {
        plate,
      },
    });
  }

  create(vehicle: Vehicle): Promise<Vehicle> {
    vehicle.type = this.getVehicleType(vehicle.price);

    return this.vehicleRepository.save(vehicle);
  }

  async update(id: number, vehicle: Vehicle): Promise<Vehicle> {
    vehicle.type = this.getVehicleType(vehicle.price);
    vehicle.id = id;

    await this.vehicleRepository.update(id, vehicle);

    return this.vehicleRepository.findOne({
      where: {
        id,
      },
    });
  }

  async delete(id: number): Promise<void> {
    await this.vehicleRepository.delete(id);

    return;
  }

  private getVehicleType(price: number): VehicleType {
    if (price < 50000) {
      return VehicleType.Popular;
    } else if (price >= 50000 && price < 100000) {
      return VehicleType.Luxury;
    } else {
      return VehicleType.SuperLuxury;
    }
  }
}
