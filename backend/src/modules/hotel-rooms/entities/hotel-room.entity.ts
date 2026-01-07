import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { RoomCategory } from './room-category.entity';

@Entity('hotel_rooms')
export class HotelRoom {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    number: string; // '101', '102'

    @Column({ nullable: true })
    floor: number; // 1, 2, 3

    @Column({ default: 'AVAILABLE' })
    status: string; // AVAILABLE, OCCUPIED, DIRTY, MAINTENANCE

    @ManyToOne(() => RoomCategory, { nullable: true })
    @JoinColumn({ name: 'category_id' })
    category: RoomCategory;

    @Column()
    companyId: string; // Tenant Isolation

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
