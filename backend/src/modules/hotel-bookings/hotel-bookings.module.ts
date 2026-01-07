import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelBookingsService } from './hotel-bookings.service';
import { HotelBookingsController } from './hotel-bookings.controller';
import { HotelBooking } from './entities/hotel-booking.entity';

@Module({
    imports: [TypeOrmModule.forFeature([HotelBooking])],
    controllers: [HotelBookingsController],
    providers: [HotelBookingsService],
    exports: [HotelBookingsService]
})
export class HotelBookingsModule { }
