import { Controller } from '@nestjs/common';
import { HotelAttendanceService } from './hotel-attendance.service';

@Controller('hotel-attendance')
export class HotelAttendanceController {
    constructor(private readonly hotelAttendanceService: HotelAttendanceService) { }
}
