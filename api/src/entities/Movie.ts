import {
  BaseEntity,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import MovieDetails from "./MovieDetails";
import Director from "./Director";
import ActorRoleMovie from "./ActorRoleMovie";
import { MovieCategory } from "const/movie";

import { constraint } from "utils/validation";

@Entity()
class Movie extends BaseEntity {
  static validations = {
    title: [constraint.required(), constraint.maxLength(100)],
  };
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: "timestamp" })
  createdDate: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedDate: Date;

  @Column("varchar")
  title: string;

  @ManyToOne(() => Director, { nullable: true })
  director: Director;

  @Column("varchar", { nullable: true, array: true })
  writers: string[];

  @Column("text", { nullable: true })
  plot: string;

  @OneToMany(() => ActorRoleMovie, (actorRoleMovie) => actorRoleMovie.movie, {
    nullable: true,
  })
  actors: ActorRoleMovie[];

  @Column({ type: "date", nullable: true })
  releasedDate: Date;

  @OneToOne(() => MovieDetails, (movieDetails) => movieDetails.movie, {
    nullable: true,
  })
  @JoinColumn()
  movieDetails: MovieDetails;

  @Column("varchar", { nullable: true })
  poster: string;

  @Column("varchar", { nullable: true })
  photos: string[];

  @Column("float", { nullable: true })
  rating: number;

  @Column({ nullable: true })
  numberOfVotes: number;

  @Column({ nullable: true })
  runtime: number;

  @Column("varchar", { nullable: true, array: true })
  movieCategory: MovieCategory[];
}

export default Movie;
