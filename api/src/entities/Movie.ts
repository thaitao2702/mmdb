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
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import MovieDetails from "./MovieDetails";
import Director from "./Director";
import ActorRoleMovie from "./ActorRoleMovie";
import { MovieCategory } from "const/movie";

@Entity()
class Movie extends BaseEntity {
  @PrimaryColumn()
  id: string;

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

  @Column("text")
  plot: string;

  @OneToMany(() => ActorRoleMovie, (actorRoleMovie) => actorRoleMovie.movie)
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

  @Column({ type: "float" })
  rating: number;

  @Column()
  numberOfVotes: number;

  @Column()
  runtime: number;

  @Column("varchar", { nullable: true, array: true })
  movieCategory: MovieCategory[];
}

export default Movie;
