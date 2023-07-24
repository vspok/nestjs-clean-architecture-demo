import { ApiProperty } from '@nestjs/swagger';
import { UserModel } from 'src/domain/models/user';

export class UserViewModel{
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    constructor(user: UserModel){
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
    }
}
