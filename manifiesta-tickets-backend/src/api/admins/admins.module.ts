import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EncryptionsModule } from '../encryptions/encryptions.module';
import { Seller } from '../sellers/seller.entity';
import { Address } from '../tickets/address.entity';
import { SellingInformation } from '../tickets/selling-information.entity';
import { Admin } from './admin.entity';
import { AdminsController } from './admins.controller';
import { AdminsService } from './admins.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin, Address, SellingInformation, Seller]),
    EncryptionsModule,
    HttpModule,
  ],
  controllers: [AdminsController],
  providers: [AdminsService]
})
export class AdminsModule {}
