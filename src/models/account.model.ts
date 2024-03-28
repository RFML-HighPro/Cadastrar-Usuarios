import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
    DeleteDateColumn,
    UpdateDateColumn,
    CreateDateColumn,
} from "typeorm"
import { User } from "./user.model"

@Entity("accounts")
export class Account {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 4 })
    agency: string

    @Column({ type: "varchar", length: 8 })
    account: string

    @Column({ type: "varchar", length: 20 })
    type_account: string

    @Column({ type: "decimal", precision: 10, scale: 2 })
    balance: number

    @OneToOne((type) => User, (account) => Account)
    @JoinColumn({ name: "user_id" })
    user: User | number

    @CreateDateColumn({ type: "timestamp" })
    created_at: Date

    @UpdateDateColumn({ type: "timestamp", update: true })
    updated_at: Date

    @DeleteDateColumn({ type: "timestamp", nullable: true })
    deleted_at: Date
}
