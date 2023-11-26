import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Crypt } from 'src/core/util/crypt';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findAll() {
    return this.userRepository.find();
  }

  findOneById(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  findOneByEmailWithPassword(email: string) {
    return this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();
  }

  async create(user: User) {
    user.password = await Crypt.hash(user.password);

    const userAlreadyExists = await this.findOneByEmail(user.email);

    if (userAlreadyExists) {
      throw new BadRequestException('User already exists');
    }

    const savedUser = await this.userRepository.save(user);

    return this.findOneById(savedUser.id);
  }

  async update(id: number, user: User) {
    user.id = id;

    if (user.password) {
      user.password = await Crypt.hash(user.password);
    }

    await this.userRepository.update(id, user);

    return this.findOneById(id);
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);

    return;
  }
}
