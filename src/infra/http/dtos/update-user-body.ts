import { IsNotEmpty, IsOptional, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserBody {
    @ApiProperty({ required: false })
    @IsNotEmpty()
    @IsOptional()
    name: string;

    @ApiProperty({ required: false })
    @IsNotEmpty()
    @IsOptional()
    email: string;

    @Matches(/^\+?\d+$/)
    @IsOptional()
    phone: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNotEmpty()
    password: string;
}
