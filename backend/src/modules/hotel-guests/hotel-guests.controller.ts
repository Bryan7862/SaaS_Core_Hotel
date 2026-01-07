import { Controller } from '@nestjs/common';
import { HotelGuestsService } from './hotel-guests.service';

@Controller('hotel-guests')
export class HotelGuestsController {
    constructor(private readonly hotelGuestsService: HotelGuestsService) { }
}
