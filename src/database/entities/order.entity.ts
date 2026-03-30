import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('orders')
export class  Order {
    @PrimaryGeneratedColumn('uuid')
    orderId: string;

    @Column ({type: 'timestamp'})
    orderAt: string;

    @Column ()
    name: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    totalAmount: number;

    @Column({ type: 'varchar', length: 32, default: 'pending' })
    status: string;

}