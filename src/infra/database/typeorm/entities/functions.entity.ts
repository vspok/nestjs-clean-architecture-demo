import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { GroupFunctionEntity } from './group_functions.entity';

@Entity('function')
export class FunctionEntity {
    @PrimaryGeneratedColumn({ type: 'int', name: 'function_id' })
    function_id: number;

    @Column()
    group_functions_id: number;

    @Column('varchar', { name: 'name', length: 255 })
    name: string;

    @Column('boolean', { default: 0 })
    is_admin: boolean;

    @Column('boolean', { default: 0 })
    is_creator_evaluation_realized_reprogrammed: boolean;

    @Column('boolean', { default: 0 })
    is_approver_evaluation_realized_reprogrammed: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn({ default: null })
    deletedAt: Date;

    @OneToMany(() => UserEntity, (user) => user.function)
    @JoinColumn({ name: 'function_id', referencedColumnName: 'function_id' })
    users: UserEntity[];

    @ManyToOne(() => GroupFunctionEntity, (_function) => _function.functions)
    @JoinColumn([{ name: 'group_function_id', referencedColumnName: 'group_function_id' }])
    group_function: GroupFunctionEntity;
}
