import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { RegisterDto } from './dto/register.dto';
import { OrganizationsService } from '../organizations/organizations.service';
import { IamService } from '../iam/iam.service';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private readonly organizationsService: OrganizationsService,
        private readonly iamService: IamService,
        private readonly jwtService: JwtService,
    ) { }

    async register(registerDto: RegisterDto): Promise<User> {
        const { email, password, firstName, lastName, companyName } = registerDto;

        // 1. Check if user exists
        const existingUser = await this.userRepository.findOne({ where: { email } });
        if (existingUser) {
            throw new BadRequestException('User with this email already exists');
        }

        // 2. Create Company (Delegated)
        const savedCompany = await this.organizationsService.create(null, { name: companyName });

        // 3. Create User
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const user = this.userRepository.create({
            email,
            passwordHash,
            firstName,
            lastName,
            defaultCompany: savedCompany,
            defaultCompanyId: savedCompany.id,
        });
        const savedUser = await this.userRepository.save(user);

        // 4. Assign OWNER role (Delegated)
        let ownerRole = await this.iamService.findRoleByCode('OWNER');
        if (!ownerRole) {
            // Auto-create OWNER role if not exists (Bootstrap logic)
            ownerRole = await this.iamService.createRole({
                code: 'OWNER',
                name: 'Owner',
                description: 'Company Owner',
            });
        }

        // Assign role using IAM Service
        await this.iamService.assignRole({
            userId: savedUser.id,
            roleId: ownerRole.id,
            companyId: savedCompany.id,
        });

        return savedUser;
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const { email, password, defaultCompanyId, firstName, lastName } = createUserDto;

        const existingUser = await this.userRepository.findOne({ where: { email } });
        if (existingUser) {
            throw new BadRequestException('User with this email already exists');
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const user = this.userRepository.create({
            email,
            passwordHash,
            defaultCompanyId,
            firstName,
            lastName,
        });

        return this.userRepository.save(user);
    }

    async getUsers(companyId?: string): Promise<User[]> {
        const query = this.userRepository.createQueryBuilder('user')
            .leftJoinAndSelect('user.userRoles', 'userRole')
            .leftJoinAndSelect('userRole.role', 'role');

        if (companyId) {
            query.where('userRole.companyId = :companyId', { companyId });
        }

        return query.getMany();
    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new BadRequestException('Invalid credentials');
        }
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            throw new BadRequestException('Invalid credentials');
        }
        return { userId: user.id, email: user.email };
    }

    async login(user: any) {
        const payload = { sub: user.userId, email: user.email };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async getUserWithRoles(userId: string) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['userRoles', 'userRoles.role'],
        });
        if (!user) return null;

        return {
            userId: user.id,
            email: user.email,
            roles: user.userRoles.map(ur => ur.role.code), // Flatten to ['ADMIN', 'OWNER']
        };
    }
}
