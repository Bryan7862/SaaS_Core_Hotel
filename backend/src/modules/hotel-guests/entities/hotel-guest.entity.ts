import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('hotel_guests')
export class HotelGuest {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    documentType: string; // DNI, PASSPORT

    @Column()
    documentNumber: string;

    @Column({ nullable: true })
    nationality: string;

    @Column({ nullable: true })
    email: string;

    @Column()
    companyId: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
