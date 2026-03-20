import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('receipts')
export class Receipt {
  @PrimaryGeneratedColumn('uuid') // Automatically generates a UUID for id
  receiptId: string;

  @Column({ type: 'timestamp' })
  issuedAt: Date;

  @Column()
  name: string;

  @Column('float')
  price: number;
}
