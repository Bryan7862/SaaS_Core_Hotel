import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelAttendanceService } from './hotel-attendance.service';
import { HotelAttendanceController } from './hotel-attendance.controller';
import { AttendanceRecord } from './entities/attendance-record.entity';

@Module({
    imports: [TypeOrmModule.forFeature([AttendanceRecord])],
    controllers: [HotelAttendanceController],
    providers: [HotelAttendanceService],
    exports: [HotelAttendanceService]
})
export class HotelAttendanceModule { }
