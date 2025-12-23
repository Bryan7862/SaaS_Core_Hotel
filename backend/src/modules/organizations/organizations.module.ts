import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationsService } from './organizations.service';
import { OrganizationsController } from './organizations.controller';
import { Company } from './entities/company.entity';
import { UserRole } from '../iam/entities/user-role.entity';
import { SubscriptionsModule } from '../subscriptions/subscriptions.module';
import { IamModule } from '../iam/iam.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Company, UserRole]),
        IamModule,
        SubscriptionsModule,
    ],
    controllers: [OrganizationsController],
    providers: [OrganizationsService],
    exports: [OrganizationsService], // Export so AuthModule can use it
})
export class OrganizationsModule { }
