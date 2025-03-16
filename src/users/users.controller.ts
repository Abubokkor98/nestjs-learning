import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  // 3 - POST /users
  @Post()
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  //  4 - PATCH /users/:id
  @Patch(':id')
  updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe)
    updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateOne(id, updateUserDto);
  }

  //  5 - DELETE /users/:id
  @Delete(':id')
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteOne(id);
  }
}
