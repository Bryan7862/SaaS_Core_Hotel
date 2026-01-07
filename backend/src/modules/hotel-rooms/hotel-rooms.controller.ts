import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HotelRoomsService } from './hotel-rooms.service';

@Controller('hotel-rooms')
export class HotelRoomsController {
    constructor(private readonly hotelRoomsService: HotelRoomsService) { }
}
