import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { FunctionEntity } from './functions.entity';

@Entity('group_function')
export class GroupFunctionEntity {
    @PrimaryGeneratedColumn({ type: 'int', name: 'group_function_id' })
    group_function_id: number;

    @Column('varchar', { name: 'name', length: 255 })
    name: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn({ default: null })
    deletedAt: Date;

    @OneToMany(() => FunctionEntity, (user) => user.group_function)
    @JoinColumn({ name: 'group_function_id', referencedColumnName: 'group_function_id' })
    functions: FunctionEntity[];
}
