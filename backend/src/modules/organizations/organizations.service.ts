import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';

@Injectable()
export class OrganizationsService {
    constructor(
        @InjectRepository(Company)
        private companyRepository: Repository<Company>,
    ) { }

    async create(name: string): Promise<Company> {
        // Check if exists? (Slug logic handles unique, but name might be duplicate allowed or not?)
        // Simple implementation for now
        const company = this.companyRepository.create({
            name,
            // Simple slug generation
            slug: name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') + '-' + Date.now(),
        });
        return this.companyRepository.save(company);
    }
}
