import { Controller } from '@nestjs/common';
import { HotelHousekeepingService } from './hotel-housekeeping.service';

@Controller('hotel-housekeeping')
export class HotelHousekeepingController {
    constructor(private readonly hotelHousekeepingService: HotelHousekeepingService) { }
}
