import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { Owner } from './owner.entity';

export enum VehicleType {
  Popular = 'popular',
  Luxury = 'luxury',
  SuperLuxury = 'super-luxury',
}

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  plate: string;

  @Column({ nullable: false })
  model: string;

  @Column({ type: 'int', nullable: false })
  price: number;

  @Column('enum', { enum: VehicleType })
  type: VehicleType;

  @RelationId((vehicle: Vehicle) => vehicle.owner)
  ownerId: number;

  @ManyToOne(() => Owner, (owner) => owner.vehicles, { cascade: true })
  owner: Owner;
}
