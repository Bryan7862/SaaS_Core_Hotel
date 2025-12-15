import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { IamService } from './iam.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { AssignRoleDto } from './dto/assign-role.dto';

@Controller('admin/iam')
export class IamController {
    constructor(private readonly iamService: IamService) { }

    @Post('roles')
    createRole(@Body() createRoleDto: CreateRoleDto) {
        return this.iamService.createRole(createRoleDto);
    }

    @Get('roles')
    getRoles() {
        return this.iamService.getRoles();
    }

    @Post('permissions')
    createPermission(@Body() createPermissionDto: CreatePermissionDto) {
        return this.iamService.createPermission(createPermissionDto);
    }

    @Get('permissions')
    getPermissions() {
        return this.iamService.getPermissions();
    }

    @Post('users/assign-role')
    assignRole(@Body() assignRoleDto: AssignRoleDto) {
        return this.iamService.assignRole(assignRoleDto);
    }

    @Post('roles/:roleId/permissions/:permissionId')
    addPermissionToRole(
        @Param('roleId') roleId: string,
        @Param('permissionId') permissionId: string,
    ) {
        return this.iamService.addPermissionToRole(roleId, permissionId);
    }
}
