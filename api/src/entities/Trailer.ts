import {
  BaseEntity,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
class Trailer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: "timestamp" })
  createdDate: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedDate: Date;

  @Column("varchar")
  name: string;

  @Column("text")
  info: string;

  @Column("varchar")
  duration: string;

  @Column("text", { nullable: true })
  screenShot: string;

  @Column("text", { nullable: true })
  poster: string;
}

export default Trailer;
