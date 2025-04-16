import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

//injectable decorator is used to mark a class as a provider that can be injected into other classes.
// This is useful for dependency injection, which is a design pattern used to create loosely coupled classes.
@Injectable()
export class EmployeesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.databaseService.employee.create({
      data: createEmployeeDto,
    });
  }
  /// This method is used to find all employees. If a role is provided, it will filter the employees by that role.
  async findAll(role?: 'INTERN' | 'ADMIN' | 'ENGINEER') {
    if (role)
      return this.databaseService.employee.findMany({
        where: {
          role,
        },
      });
    return this.databaseService.employee.findMany();
  }
  // findOne method is used to find a single employee by their ID.
  async findOne(id: number) {
    return this.databaseService.employee.findUnique({
      where: {
        id,
      },
    });
  }

  // This method is used to update an employee's information. It takes the employee ID and the data to be updated as parameters.
  async update(id: number, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    return this.databaseService.employee.update({
      where: {
        id,
      },
      data: updateEmployeeDto,
    });
  }

  // This method is used to remove an employee from the database. It takes the employee ID as a parameter.
  async remove(id: number) {
    return this.databaseService.employee.delete({
      where: {
        id,
      },
    });
  }
}
