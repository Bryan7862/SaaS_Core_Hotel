import { Controller } from '@nestjs/common';
import { HotelBookingsService } from './hotel-bookings.service';

@Controller('hotel-bookings')
export class HotelBookingsController {
    constructor(private readonly hotelBookingsService: HotelBookingsService) { }
}
