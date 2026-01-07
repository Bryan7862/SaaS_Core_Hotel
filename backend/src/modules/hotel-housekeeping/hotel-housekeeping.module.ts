import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelHousekeepingService } from './hotel-housekeeping.service';
import { HotelHousekeepingController } from './hotel-housekeeping.controller';
import { HousekeepingTask } from './entities/housekeeping-task.entity';

@Module({
    imports: [TypeOrmModule.forFeature([HousekeepingTask])],
    controllers: [HotelHousekeepingController],
    providers: [HotelHousekeepingService],
    exports: [HotelHousekeepingService]
})
export class HotelHousekeepingModule { }
