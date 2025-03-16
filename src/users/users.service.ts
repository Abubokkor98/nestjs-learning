import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice@example.com',
      role: 'ADMIN',
    },
    {
      id: 2,
      name: 'Bob Smith',
      email: 'bob@example.com',
      role: 'INTERN',
    },
    {
      id: 3,
      name: 'Charlie Davis',
      email: 'charlie@example.com',
      role: 'ADMIN',
    },
    {
      id: 4,
      name: 'David Wilson',
      email: 'david@example.com',
      role: 'INTERN',
    },
    {
      id: 5,
      name: 'Emma Thompson',
      email: 'emma@example.com',
      role: 'ADMIN',
    },
  ];

  //   for get all users
  findAll(role?: 'ADMIN' | 'INTERN') {
    if (role) {
      return this.users.filter((user) => user.role === role);
    }
    return this.users;
  }

  //   for get a single user
  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    return user;
  }
  // for create a user
  create(user: { name: string; email: string; role: 'ADMIN' | 'INTERN' }) {
    const usersByNewestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: usersByNewestId[0].id + 1,
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }

  //   for update a user
  // user may update any field, that's why optional chaining
  updateOne(
    id: number,
    updatedUser: { name?: string; email?: string; role?: 'ADMIN' | 'INTERN' },
  ) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updatedUser };
      }
      return user;
    });
    return this.findOne(id);
  }

  //   for delete a user
  deleteOne(id: number) {
    const removedUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);
    return removedUser;
  }
}
