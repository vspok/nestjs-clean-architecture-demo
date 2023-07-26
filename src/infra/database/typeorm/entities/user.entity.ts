import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { FunctionEntity } from './functions.entity';

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn({ type: 'int', name: 'user_id' })
    user_id: number;

    @Column('varchar', { name: 'name', length: 255 })
    name: string;

    @Column('varchar', { name: 'email', unique: true, length: 255 })
    email: string;

    @Column('varchar', { name: 'phone', nullable: true, length: 45 })
    phone: string;

    @Column('varchar', { name: 'password', length: 255 })
    password: string;

    @Column({ default: null })
    function_id: number;

    @ManyToOne(() => FunctionEntity, (_function) => _function.users)
    @JoinColumn([{ name: 'function_id', referencedColumnName: 'function_id' }])
    function: FunctionEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn({ default: null })
    deletedAt: Date;
}
