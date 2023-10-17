import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    employeeId: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    designation: string;

    @Column({ nullable: true })
    phone: string;

    @Column({ nullable: true })
    bloodGroup: string;

    @Column({ nullable: true })
    address: string;

    @Column({ nullable: true })
    institution: string;

    @Column({ nullable: true })
    degree: string;

    @Column({ nullable: true })
    passingYear: number;

    @Column({ nullable: true })
    photo: string;

    @Column({ default: true })
    isActive: boolean;
}