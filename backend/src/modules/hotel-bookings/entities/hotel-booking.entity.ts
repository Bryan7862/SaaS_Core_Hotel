import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('hotel_bookings')
export class HotelBooking {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    guestName: string; // Temporary, will link to HotelGuest later

    @Column({ type: 'timestamp' })
    checkInDate: Date;

    @Column({ type: 'timestamp' })
    checkOutDate: Date;

    @Column()
    status: string; // CONFIRMED, CHECKED_IN, CHECKED_OUT, CANCELLED

    @Column()
    totalAmount: number;

    @Column()
    companyId: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
