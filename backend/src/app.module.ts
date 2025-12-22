import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { IamModule } from './modules/iam/iam.module';
import { OrganizationsModule } from './modules/organizations/organizations.module';
import { TrashModule } from './modules/trash/trash.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST || 'localhost',
            port: parseInt(process.env.DB_PORT) || 5432,
            username: process.env.DB_USERNAME || 'postgres',
            password: process.env.DB_PASSWORD || 'postgres',
            database: process.env.DB_DATABASE || 'saas_core',
            autoLoadEntities: true,
            synchronize: true,
        }),
        AuthModule,
        IamModule,
        OrganizationsModule,
        TrashModule,
    ],
})
export class AppModule { }
