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

@Controller('users')
export class UsersController {
  /*
    GET /users
    GET /users/:id
    POST /users
    PATCH /users/:id
    DELETE /users/:id
    */

  // 1 - GET /users
  //   @Get()
  //   findAll() {
  //     return [];
  //   }
  // 1 - GET /users or /users?role=value
  @Get()
  findAll(@Query('role') role?: 'ADMIN' | 'INTERN') {
    return [];
  }

  //   2- GET /users/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return { id };
  }

  // 3 - POST /users
  @Post()
  create(@Body() user: {}) {
    return user;
  }

  //  4 - PATCH /users/:id
  @Patch(':id')
  updateOne(@Param('id') id: string, @Body() updatedUser: {}) {
    return { id, ...updatedUser };
  }

  //  5 - DELETE /users/:id
  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return { id };
  }
}
