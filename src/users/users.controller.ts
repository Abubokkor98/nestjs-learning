import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // 1 - GET /users
  //   @Get()
  //   findAll() {
  //     return [];
  //   }
  // 1 - GET /users or /users?role=value
  @Get()
  findAll(@Query('role') role?: 'ADMIN' | 'INTERN') {
    return this.userService.findAll(role);
  }

  //   2- GET /users/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  // 3 - POST /users
  @Post()
  create(
    @Body() user: { name: string; email: string; role: 'ADMIN' | 'INTERN' },
  ) {
    return this.userService.create(user);
  }

  //  4 - PATCH /users/:id
  @Patch(':id')
  updateOne(
    @Param('id') id: string,
    @Body()
    updatedUser: { name?: string; email?: string; role?: 'ADMIN' | 'INTERN' },
  ) {
    return this.userService.updateOne(+id, updatedUser);
  }

  //  5 - DELETE /users/:id
  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.userService.deleteOne(+id);
  }
}
