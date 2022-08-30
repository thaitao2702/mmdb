import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import Movie from "./Movie";
import Actor from "./Actor";

@Entity()
class ActorRoleMovie extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: "timestamp" })
  createdDate: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedDate: Date;

  @Column()
  movieId: string;

  @Column()
  movieTitle: string;

  @Column()
  actorId: string;

  @Column("varchar")
  actorName: string;

  @Column("varchar")
  role: string;

  @ManyToOne(() => Movie)
  movie: Movie;

  @ManyToOne(() => Actor)
  actor: Actor;
}

export default ActorRoleMovie;
