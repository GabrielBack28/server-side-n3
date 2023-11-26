import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VehicleModule } from './modules/vehicle/vehicle.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { mySqlOptions } from './core/database/database';
import { OwnerModule } from './modules/owner/owner.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(mySqlOptions as TypeOrmModuleOptions),
    VehicleModule,
    OwnerModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
