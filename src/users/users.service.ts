import { Injectable } from "@nestjs/common"
import { CreateUserInput } from "./dto/input/create-user.input";
import { v4 as uuidv4 } from 'uuid'
import { User } from "./models/user"
import { UpdateUserInput } from "./dto/input/update-user.input";
import { Object } from "@ungap/global-this";
import { GetUserArgs, GetUserByAgeArgs } from "./dto/args/get-user.args";
import { GetUsersArgs } from "./dto/args/get-users.args";
import { DeleteUserInput } from "./dto/input/delete-user.input";

@Injectable()
export class UsersService {
    private users: User[] = [];

    public getUser(getUserArgs: GetUserArgs): User {
        return this.users.find(user => user.userId === getUserArgs.userId);
    }
    public getUserByAge(getUserArgs: GetUserByAgeArgs): User {
        return this.users.find(user => user.age === getUserArgs.age);
    }

    public getUsers(getUsersArgs: GetUsersArgs): User[] {
        return getUsersArgs.userIds.map(userId => this.getUser({ userId }));
    }

    public createUser(createUserData: CreateUserInput): User {
        const user: User = {
            userId: uuidv4(),
            ...createUserData
        }
        this.users.push(user);
        return user;
    }

    public updateUser(updateUserData: UpdateUserInput): User {
        const user = this.users.find(user => user.userId === updateUserData.userId);
        
        Object.assign(user, updateUserData)
        return user
    }

    public deleteUser(deleteUserData: DeleteUserInput): User {
        const userIndex = this.users.findIndex(user => user.userId === deleteUserData.userId);
        const user = this.users[userIndex];
        this.users.splice(userIndex)
        return user;
    }
    
}