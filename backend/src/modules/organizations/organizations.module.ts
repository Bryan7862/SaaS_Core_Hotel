import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationsService } from './organizations.service';
import { OrganizationsController } from './organizations.controller';
import { Company } from './entities/company.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Company,
        ]),
    ],
    controllers: [OrganizationsController],
    providers: [OrganizationsService],
    exports: [OrganizationsService], // Export so AuthModule can use it
})
export class OrganizationsModule { }
