import {
  BaseEntity,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import ActorRoleMovie from "./ActorRoleMovie";

@Entity()
class Actor extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @CreateDateColumn({ type: "timestamp" })
  createdDate: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedDate: Date;

  @Column("varchar")
  name: string;

  @Column("text")
  overView: string;

  @Column({ type: "date", nullable: true })
  birthDate: Date;

  @Column({ type: "varchar", nullable: true })
  birthPlace: string;

  @Column("text", { nullable: true })
  avatar: string;

  @OneToMany(() => ActorRoleMovie, (actorRoleMovie) => actorRoleMovie.movie)
  movies: ActorRoleMovie[];
}

export default Actor;
