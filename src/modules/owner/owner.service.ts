import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Owner } from 'src/entity/owner.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OwnerService {
  constructor(
    @InjectRepository(Owner)
    private readonly ownerRepository: Repository<Owner>,
  ) {}

  findAll(owner: Owner) {
    return this.ownerRepository.find({
      where: owner,
    });
  }

  findAllWithVehicles() {
    return this.ownerRepository.find({
      relations: ['vehicles'],
    });
  }

  findOneById(id: number) {
    return this.ownerRepository.findOne({
      where: {
        id,
      },
    });
  }

  create(owner: Owner) {
    if (!this.isCpfValid(owner.cpf)) {
      throw new BadRequestException('Invalid CPF');
    }

    return this.ownerRepository.save(owner);
  }

  update(id: number, owner: Owner) {
    owner.id = id;

    if (!this.isCpfValid(owner.cpf)) {
      throw new BadRequestException('Invalid CPF');
    }

    return this.ownerRepository.update(id, owner);
  }

  async delete(id: number): Promise<void> {
    await this.ownerRepository.delete(id);

    return;
  }

  private isCpfValid(cpf: string): boolean {
    cpf = cpf.replace(/[^\d]+/g, '');

    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) {
      return false;
    }

    const values = cpf.split('').map((el) => +el);
    const rest = (count) =>
      ((values
        .slice(0, count - 12)
        .reduce((soma, el, index) => soma + el * (count - index), 0) *
        10) %
        11) %
      10;

    return rest(10) === values[9] && rest(11) === values[10];
  }
}
