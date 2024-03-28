import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    UpdateDateColumn,
    DeleteDateColumn,
    CreateDateColumn,
} from "typeorm"
import { Account } from "./account.model"

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number = 0

    @Column({ type: "varchar", length: 255 })
    name: string

    @Column({ type: "varchar", length: 14 })
    cpf: string

    @Column({ type: "date" })
    birthdate: Date

    @Column({ type: "varchar", length: 200 })
    email: string

    @Column({ type: "varchar", length: 255 })
    password: string

    @OneToOne((type) => Account, (user) => User)
    account: Account

    @CreateDateColumn({ type: "timestamp" })
    created_at: Date

    @UpdateDateColumn({ type: "timestamp", update: true })
    updated_at: Date

    @DeleteDateColumn({ type: "timestamp", nullable: true })
    deleted_at: Date
}
